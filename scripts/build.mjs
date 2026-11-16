/**
 * WINEMI CAPITAL — content-hash build
 * Hashes CSS/JS under assets/, rewrites HTML/CSS/JS references, emits dist/.
 * No dependencies. Run: node scripts/build.mjs
 */
import { createHash } from 'node:crypto';
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  statSync,
  rmSync,
  existsSync,
} from 'node:fs';
import { join, relative, dirname, basename, extname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const HASH_LEN = 8;

const SKIP_COPY = new Set(['dist', 'node_modules', '.git', 'scripts', '.vercel']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') && name !== '.well-known') continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (SKIP_COPY.has(name)) continue;
      walk(abs, out);
    } else {
      out.push(abs);
    }
  }
  return out;
}

function sha(content) {
  return createHash('sha256').update(content).digest('hex').slice(0, HASH_LEN);
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function relPosix(fromRoot, abs) {
  return relative(fromRoot, abs).split('\\').join('/');
}

// --- collect hashable assets ---
const assetFiles = walk(join(ROOT, 'assets')).filter((f) => {
  const e = extname(f).toLowerCase();
  return e === '.css' || e === '.js';
});

/** logical path (posix from repo root) -> { hash, hashedLogical, content } */
const map = new Map();

for (const abs of assetFiles) {
  const content = readFileSync(abs);
  const h = sha(content);
  const logical = relPosix(ROOT, abs);
  const ext = extname(logical);
  const base = logical.slice(0, -ext.length);
  const hashedLogical = `${base}.${h}${ext}`;
  map.set(logical, { hash: h, hashedLogical, content, abs });
}

console.log(`Hashed ${map.size} assets`);

// --- prepare dist ---
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
ensureDir(DIST);

// Copy non-asset-tree files + images; write hashed css/js
const allFiles = walk(ROOT);
for (const abs of allFiles) {
  const logical = relPosix(ROOT, abs);
  if (logical.startsWith('dist/')) continue;

  // Skip original css/js — we emit hashed copies instead
  if (map.has(logical)) continue;

  const dest = join(DIST, logical);
  ensureDir(dirname(dest));
  copyFileSync(abs, dest);
}

// Write hashed assets (raw first; CSS will be rewritten below)
for (const [, info] of map) {
  const dest = join(DIST, info.hashedLogical);
  ensureDir(dirname(dest));
  writeFileSync(dest, info.content);
}

// --- rewrite helpers ---
function hashedRef(logicalPath) {
  const norm = logicalPath.replace(/^\.\//, '');
  const info = map.get(norm);
  return info ? info.hashedLogical : null;
}

/** Replace assets/css|js/file.ext with hashed form in arbitrary text */
function rewriteAssetPaths(text) {
  let out = text;
  // Longest paths first to avoid partial collisions
  const keys = [...map.keys()].sort((a, b) => b.length - a.length);
  for (const logical of keys) {
    const hashed = map.get(logical).hashedLogical;
    // Escape for regex
    const esc = logical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(esc, 'g'), hashed);
  }
  return out;
}

/** Rewrite CSS @import url('file.css') / url("file.css") relative to a CSS file's directory */
function rewriteCssImports(cssText, cssLogical) {
  const dir = posix.dirname(cssLogical);
  return cssText.replace(
    /@import\s+(?:url\(\s*)?['"]([^'"]+)['"]\s*\)?/g,
    (full, ref) => {
      if (/^https?:\/\//i.test(ref) || ref.startsWith('data:')) return full;
      // resolve relative to this CSS file
      let resolved;
      if (ref.startsWith('/')) {
        resolved = ref.slice(1);
      } else {
        resolved = posix.normalize(posix.join(dir, ref));
      }
      const hit = map.get(resolved);
      if (!hit) return full;
      // keep same relative style as original when possible
      const hashedName = posix.basename(hit.hashedLogical);
      if (!ref.includes('/')) {
        return full.replace(ref, hashedName);
      }
      const relHashed = posix.relative(dir, hit.hashedLogical);
      return full.replace(ref, relHashed);
    }
  );
}

/** For JS dynamic loaders that use bare filenames like 'site-polish.js' */
function rewriteBareAssetFilenames(jsText) {
  let out = jsText;
  for (const [logical, info] of map) {
    const base = basename(logical);
    const hashedBase = basename(info.hashedLogical);
    if (base === hashedBase) continue;
    // Only replace quoted bare filenames
    const esc = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(new RegExp(`(['"])${esc}\\1`, 'g'), `$1${hashedBase}$1`);
  }
  return out;
}

// Rewrite hashed CSS contents (@import + any absolute asset paths)
for (const [logical, info] of map) {
  if (!logical.endsWith('.css')) continue;
  let text = info.content.toString('utf8');
  text = rewriteCssImports(text, logical);
  text = rewriteAssetPaths(text);
  writeFileSync(join(DIST, info.hashedLogical), text);
}

// Rewrite hashed JS contents
for (const [logical, info] of map) {
  if (!logical.endsWith('.js')) continue;
  let text = info.content.toString('utf8');
  text = rewriteAssetPaths(text);
  text = rewriteBareAssetFilenames(text);
  writeFileSync(join(DIST, info.hashedLogical), text);
}

// Rewrite HTML in dist
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
for (const abs of htmlFiles) {
  let text = readFileSync(abs, 'utf8');
  text = rewriteAssetPaths(text);
  writeFileSync(abs, text);
}

// Manifest (logical -> hashed) for debugging / future runtime use
const manifest = {};
for (const [logical, info] of map) {
  manifest[logical] = info.hashedLogical;
}
writeFileSync(join(DIST, 'asset-manifest.json'), JSON.stringify(manifest, null, 2));

// Also keep a tiny runtime helper (optional)
const runtime = `/*! winemi asset map */window.__WINEMI_ASSETS__=${JSON.stringify(manifest)};window.__asset=function(p){if(!p)return p;var m=window.__WINEMI_ASSETS__||{},n=String(p).replace(/^\\.\\//,'').replace(/^\\.\\.\\//,'');return m[p]||m[n]||m['assets/'+n.replace(/^assets\\//,'')]||p;};\n`;
writeFileSync(join(DIST, 'assets/js/asset-runtime.js'), runtime);

console.log(`Wrote dist/ with ${htmlFiles.length} HTML files rewritten`);
console.log(`Manifest entries: ${Object.keys(manifest).length}`);
console.log('Sample:', Object.entries(manifest).slice(0, 5).map(([k, v]) => `${k} -> ${v}`).join('\n  '));
