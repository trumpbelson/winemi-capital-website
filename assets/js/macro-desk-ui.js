(function () {
  'use strict';

  function ensureAdvancedUI() {
    var focusChips = document.getElementById('focus-chips');
    if (focusChips && !document.getElementById('compare-toggle')) {
      var tools = document.createElement('div');
      tools.className = 'focus-tools';
      tools.innerHTML =
        '<div class="tf-chips" role="group" aria-label="Chart timeframe">' +
        '<button type="button" class="tf-chip active" data-tf="D">1D</button>' +
        '<button type="button" class="tf-chip" data-tf="240">4H</button>' +
        '<button type="button" class="tf-chip" data-tf="60">1H</button>' +
        '<button type="button" class="tf-chip" data-tf="W">1W</button></div>' +
        '<button type="button" class="tool-chip" id="compare-toggle" aria-pressed="false">Compare off</button>' +
        '<select id="compare-symbol" class="compare-select" aria-label="Compare symbol">' +
        '<option value="TVC:DXY">vs DXY</option><option value="TVC:US10Y">vs US 10Y</option>' +
        '<option value="TVC:GOLD">vs Gold</option><option value="FOREXCOM:SPXUSD">vs S&P 500</option>' +
        '<option value="TVC:VIX">vs VIX</option></select>' +
        '<button type="button" class="tool-chip" id="watchlist-add">+ Watchlist</button>' +
        '<button type="button" class="tool-chip" id="focus-fullscreen">Fullscreen</button>';
      focusChips.parentNode.insertBefore(tools, focusChips.nextSibling);
      var panel = focusChips.parentNode.querySelector('#macro-focus-chart');
      if (panel) {
        var wrap = panel.closest('.macro-panel');
        if (wrap) wrap.id = 'focus-panel';
      }
    }

    var checklist = document.querySelector('.macro-checklist');
    if (checklist && !checklist.querySelector('[data-step]')) {
      var steps = [
        ['calendar', 'Calendar first.', 'Identify high-impact releases in the next 1–5 sessions.'],
        ['backdrop', 'Map the backdrop.', 'Check US 10Y, DXY, and major equity indices for regime.'],
        ['structure', 'Structure second.', 'Only then open HTF zones and candles.'],
        ['invalidation', 'Write invalidation.', 'Define what would break the structure before a major print.']
      ];
      var prog = document.createElement('div');
      prog.className = 'workflow-progress';
      prog.innerHTML = '<div class="workflow-progress-track"><div id="workflow-progress-bar"></div></div><span id="workflow-progress-label">0 / 4 steps</span>';
      checklist.parentNode.insertBefore(prog, checklist);
      checklist.innerHTML = steps.map(function (s) {
        return '<li data-step="' + s[0] + '"><label><input type="checkbox" /> <strong>' + s[1] + '</strong> ' + s[2] + '</label></li>';
      }).join('');
    }

    if (!document.getElementById('watchlist-host')) {
      var themes = document.getElementById('themes');
      var grid = document.createElement('div');
      grid.className = 'adv-grid';
      grid.id = 'desk-tools';
      grid.innerHTML =
        '<div class="macro-panel" style="padding:1.1rem 1.15rem;overflow:visible;">' +
        '<div class="macro-panel-head" style="border:0;padding:0 0 0.75rem;background:transparent;"><h2>Watchlist</h2><span class="hint">Local · click to focus</span></div>' +
        '<div id="watchlist-host"></div></div>' +
        '<div class="macro-panel" style="padding:1.1rem 1.15rem;overflow:visible;">' +
        '<div class="macro-panel-head" style="border:0;padding:0 0 0.75rem;background:transparent;"><h2>Study journal</h2><span class="hint">Saved in this browser</span></div>' +
        '<textarea id="macro-journal" placeholder="Event risk notes, invalidation levels, regime read…"></textarea>' +
        '<div class="journal-actions" style="margin-top:0.65rem;">' +
        '<button type="button" class="tool-chip" id="journal-save">Save</button>' +
        '<button type="button" class="tool-chip" id="journal-clear">Clear</button>' +
        '<span id="journal-status" class="body-small" style="margin-left:0.35rem;"></span></div></div>';
      if (themes && themes.parentNode) themes.parentNode.insertBefore(grid, themes);
      else {
        var main = document.querySelector('main .container');
        if (main) main.appendChild(grid);
      }
    }

    if (!document.getElementById('shortcut-help')) {
      var help = document.createElement('div');
      help.className = 'shortcut-help';
      help.id = 'shortcut-help';
      help.setAttribute('role', 'dialog');
      help.innerHTML = '<h3>Shortcuts</h3><dl>' +
        '<dt>?</dt><dd>Toggle this help</dd><dt>H</dt><dd>Hide / show live data</dd>' +
        '<dt>C</dt><dd>Toggle compare</dd><dt>1–4</dt><dd>Timeframe D / 4H / 1H / W</dd>' +
        '<dt>Esc</dt><dd>Close help</dd></dl>' +
        '<button type="button" class="tool-chip" id="shortcut-help-close" style="margin-top:0.75rem;">Close</button>';
      document.body.appendChild(help);
    }

    if (!document.getElementById('macro-adv-style')) {
      var st = document.createElement('style');
      st.id = 'macro-adv-style';
      st.textContent =
        '.tf-chips,.focus-tools{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 .75rem;align-items:center}' +
        '.tf-chip,.tool-chip{padding:.4rem .75rem;border-radius:6px;cursor:pointer;border:1px solid rgba(184,149,106,.28);background:#161618;color:rgba(247,245,240,.75);font-size:.72rem;font-weight:600;letter-spacing:.04em}' +
        '.tf-chip.active,.tool-chip.active{background:rgba(184,149,106,.16);border-color:rgba(184,149,106,.65);color:#e0c49a}' +
        'html[data-theme=light] .tf-chip,html[data-theme=light] .tool-chip{background:#fff;color:rgba(12,12,14,.7);border-color:rgba(122,95,50,.25)}' +
        'html[data-theme=light] .tf-chip.active,html[data-theme=light] .tool-chip.active{color:#7a5f32;background:rgba(122,95,50,.1);border-color:rgba(122,95,50,.5)}' +
        '.compare-select{padding:.4rem .55rem;border-radius:6px;border:1px solid rgba(184,149,106,.28);background:#161618;color:rgba(247,245,240,.85);font-size:.75rem}' +
        'html[data-theme=light] .compare-select{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.28)}' +
        '.adv-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin:2rem 0}' +
        '@media(max-width:900px){.adv-grid{grid-template-columns:1fr}}' +
        '.watch-row,.journal-actions{display:flex;align-items:center;gap:.5rem}' +
        '.watch-row{justify-content:space-between;padding:.45rem 0;border-bottom:1px solid rgba(184,149,106,.12)}' +
        '.watch-sym{background:none;border:none;color:#c9a87c;font-size:.875rem;font-weight:600;cursor:pointer;text-align:left}' +
        '.watch-remove{background:none;border:none;color:rgba(247,245,240,.4);font-size:1.1rem;cursor:pointer;line-height:1}' +
        '.watch-remove:hover{color:#c45c5c}' +
        '#macro-journal{width:100%;min-height:140px;resize:vertical;padding:.85rem 1rem;border:1px solid rgba(184,149,106,.25);border-radius:8px;background:#121214;color:rgba(247,245,240,.9);font-family:inherit;font-size:.9rem;line-height:1.55}' +
        'html[data-theme=light] #macro-journal{background:#fff;color:#0c0c0e;border-color:rgba(122,95,50,.28)}' +
        '.workflow-progress{margin:.75rem 0 1rem}' +
        '.workflow-progress-track{height:6px;border-radius:999px;background:rgba(184,149,106,.15);overflow:hidden}' +
        '#workflow-progress-bar{height:100%;width:0%;background:linear-gradient(90deg,#b8956a,#c9a87c);transition:width 200ms ease}' +
        '#workflow-progress-label{font-size:.75rem;color:rgba(247,245,240,.55);margin-top:.35rem;display:block}' +
        'html[data-theme=light] #workflow-progress-label{color:rgba(12,12,14,.5)}' +
        '.macro-checklist li.is-done{opacity:.75}' +
        '.macro-checklist li label{cursor:pointer;display:block}' +
        '.macro-checklist li input[type=checkbox]{position:absolute;left:.75rem;top:1.05rem;accent-color:#b8956a}' +
        '.macro-checklist li{padding-left:2.6rem}' +
        '.shortcut-help{display:none;position:fixed;inset:auto 1rem 1rem auto;z-index:2000;max-width:280px;padding:1rem 1.15rem;border-radius:10px;background:#161618;border:1px solid rgba(184,149,106,.35);box-shadow:0 12px 40px rgba(0,0,0,.45);color:rgba(247,245,240,.85);font-size:.8125rem}' +
        '.shortcut-help.is-open{display:block}' +
        '.shortcut-help h3{margin:0 0 .6rem;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#c9a87c}' +
        '.shortcut-help dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:.35rem .75rem}' +
        '.shortcut-help dt{font-weight:600;color:#e0c49a}.shortcut-help dd{margin:0;color:rgba(247,245,240,.7)}' +
        '#focus-panel:fullscreen{padding:1rem;background:#0a0a0b}';
      document.head.appendChild(st);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureAdvancedUI);
  } else {
    ensureAdvancedUI();
  }
})();
