/*! WINEMI CAPITAL — Macro desk PRO layer
 * Workspaces, split chart, symbol notes, regime scoreboard, panel maximize.
 * Educational tooling only — not signals or advice.
 */
(function () {
  'use strict';

  var PRO = {
    workspaces: 'winemi-macro-workspaces',
    notes: 'winemi-macro-symbol-notes',
    split: 'winemi-macro-split',
    splitSym: 'winemi-macro-split-symbol'
  };

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var NAMES = {
    'TVC:US10Y': 'US 10Y', 'TVC:US02Y': 'US 2Y', 'TVC:DXY': 'DXY', 'TVC:GOLD': 'Gold',
    'TVC:SILVER': 'Silver', 'FOREXCOM:SPXUSD': 'S&P 500', 'FOREXCOM:NSXUSD': 'NASDAQ',
    'FX:EURUSD': 'EUR/USD', 'FX:GBPUSD': 'GBP/USD', 'FX:USDJPY': 'USD/JPY',
    'FX:AUDUSD': 'AUD/USD', 'TVC:USOIL': 'WTI', 'TVC:COPPER': 'Copper',
    'BINANCE:BTCUSDT': 'BTC', 'BINANCE:ETHUSDT': 'ETH', 'TVC:VIX': 'VIX'
  };

  function toast(msg) {
    var el = document.getElementById('desk-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'desk-toast';
      el.className = 'desk-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2200);
  }

  function injectStyles() {
    if (document.getElementById('winemi-pro-style')) return;
    var s = document.createElement('style');
    s.id = 'winemi-pro-style';
    s.textContent = [
      '.pro-dock{display:flex;flex-wrap:wrap;gap:.35rem;margin:.55rem 0 .75rem;align-items:center}',
      '.pro-chip{padding:.38rem .7rem;border-radius:8px;cursor:pointer;border:1px solid rgba(184,149,106,.3);background:rgba(184,149,106,.08);color:rgba(247,245,240,.8);font-size:.68rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase}',
      '.pro-chip:hover,.pro-chip.active{border-color:rgba(184,149,106,.6);color:#e0c49a;background:rgba(184,149,106,.16)}',
      'html[data-theme=light] .pro-chip{color:rgba(12,12,14,.7);border-color:rgba(122,95,50,.28);background:rgba(122,95,50,.06)}',
      'html[data-theme=light] .pro-chip:hover,html[data-theme=light] .pro-chip.active{color:#7a5f32;border-color:rgba(122,95,50,.5);background:rgba(122,95,50,.1)}',
      '.scoreboard{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:.45rem;margin:0 0 .85rem}',
      '.score-card{border:1px solid rgba(184,149,106,.22);border-radius:10px;padding:.55rem .65rem;background:#141416;cursor:pointer;transition:border-color .15s,transform .15s}',
      '.score-card:hover{border-color:rgba(184,149,106,.55);transform:translateY(-1px)}',
      'html[data-theme=light] .score-card{background:#fff;border-color:rgba(122,95,50,.22)}',
      '.score-card .sc-label{font-size:.65rem;letter-spacing:.06em;text-transform:uppercase;color:#c9a87c;margin:0 0 .2rem}',
      'html[data-theme=light] .score-card .sc-label{color:#7a5f32}',
      '.score-card .sc-name{font-size:.78rem;font-weight:600;color:rgba(247,245,240,.9);margin:0}',
      'html[data-theme=light] .score-card .sc-name{color:#0c0c0e}',
      '.score-card .sc-hint{font-size:.65rem;opacity:.6;margin:.15rem 0 0}',
      '.split-wrap{display:grid;grid-template-columns:1fr 1fr;gap:.65rem}',
      '.split-wrap.is-off{display:block}',
      '.split-wrap.is-off .split-pane-b{display:none}',
      '#macro-focus-chart-b{height:520px}',
      'body.desk-density-compact #macro-focus-chart-b{height:460px}',
      '.split-pane{min-width:0}',
      '.note-panel{margin-top:.45rem}',
      '.note-panel textarea{width:100%;min-height:56px;border-radius:8px;border:1px solid rgba(184,149,106,.25);background:#0e0e10;color:rgba(247,245,240,.9);padding:.45rem .55rem;font:inherit;font-size:.78rem;resize:vertical}',
      'html[data-theme=light] .note-panel textarea{background:#f7f5f0;color:#0c0c0e;border-color:rgba(122,95,50,.25)}',
      '.ws-list{display:flex;flex-direction:column;gap:.3rem;margin-top:.4rem}',
      '.ws-row{display:flex;align-items:center;justify-content:space-between;gap:.4rem;padding:.35rem .5rem;border-radius:8px;border:1px solid rgba(184,149,106,.18);font-size:.75rem;cursor:pointer}',
      '.ws-row:hover{border-color:rgba(184,149,106,.4);background:rgba(184,149,106,.06)}',
      '.ws-row button{border:0;background:transparent;color:rgba(247,245,240,.4);cursor:pointer}',
      '.ws-row button:hover{color:#e07a7a}',
      '.desk-secondary.is-max{position:fixed;inset:72px 12px 12px 12px;z-index:60;background:#0a0a0b;border:1px solid rgba(184,149,106,.35);border-radius:14px;padding:1rem;overflow:auto;box-shadow:0 24px 64px rgba(0,0,0,.55)}',
      'html[data-theme=light] .desk-secondary.is-max{background:#f3f0e8}',
      '.pro-modal-backdrop{position:fixed;inset:0;z-index:210;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;padding:1rem}',
      '.pro-modal-backdrop.is-open{display:flex}',
      '.pro-modal{width:min(400px,100%);background:#161618;border:1px solid rgba(184,149,106,.4);border-radius:14px;padding:1.1rem;box-shadow:0 24px 64px rgba(0,0,0,.5)}',
      'html[data-theme=light] .pro-modal{background:#fff;border-color:rgba(122,95,50,.35)}',
      '.pro-modal h3{margin:0 0 .65rem;font-size:.9rem;color:#c9a87c}',
      '.pro-modal input{width:100%;box-sizing:border-box;border-radius:8px;border:1px solid rgba(184,149,106,.3);background:#0e0e10;color:rgba(247,245,240,.9);padding:.55rem .7rem;font:inherit;margin:0 0 .65rem}',
      'html[data-theme=light] .pro-modal input{background:#f7f5f0;color:#0c0c0e}',
      '.pro-modal-actions{display:flex;gap:.4rem;justify-content:flex-end}',
      '@media (max-width:820px){.split-wrap{grid-template-columns:1fr}#macro-focus-chart-b{height:320px}}'
    ].join('');
    document.head.appendChild(s);
  }

  function ensureChrome() {
    injectStyles();

    if (!document.getElementById('pro-dock')) {
      var anchor = document.querySelector('.basket-strip') || document.getElementById('regime-strip') || document.querySelector('.desk-command');
      var dock = document.createElement('div');
      dock.id = 'pro-dock';
      dock.className = 'pro-dock';
      dock.innerHTML =
        '<button type="button" class="pro-chip" id="pro-split" title="Side-by-side charts">Split chart</button>' +
        '<button type="button" class="pro-chip" id="pro-scoreboard" title="Regime scoreboard">Scoreboard</button>' +
        '<button type="button" class="pro-chip" id="pro-ws-save" title="Save workspace">Save WS</button>' +
        '<button type="button" class="pro-chip" id="pro-ws-load" title="Load workspace">Load WS</button>' +
        '<button type="button" class="pro-chip" id="pro-max-secondary" title="Maximize secondary panel">Max panel</button>' +
        '<button type="button" class="pro-chip" id="pro-note-focus" title="Note on focus symbol">Symbol note</button>';
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(dock, anchor.nextSibling);
      }
    }

    if (!document.getElementById('pro-scoreboard-host')) {
      var host = document.createElement('div');
      host.id = 'pro-scoreboard-host';
      host.className = 'scoreboard';
      host.hidden = true;
      var dockEl = document.getElementById('pro-dock');
      if (dockEl && dockEl.parentNode) dockEl.parentNode.insertBefore(host, dockEl.nextSibling);
    }

    var chart = document.getElementById('macro-focus-chart');
    var panel = document.getElementById('focus-panel');
    if (chart && panel && !document.getElementById('split-wrap')) {
      var wrap = document.createElement('div');
      wrap.id = 'split-wrap';
      wrap.className = 'split-wrap is-off';
      var paneA = document.createElement('div');
      paneA.className = 'split-pane split-pane-a';
      var paneB = document.createElement('div');
      paneB.className = 'split-pane split-pane-b';
      paneB.innerHTML =
        '<div class="macro-panel-head" style="border-bottom:1px solid rgba(184,149,106,.15)">' +
        '<h2 id="split-title" style="margin:0;font-size:.85rem">Compare chart</h2>' +
        '<select id="split-symbol" class="compare-select" aria-label="Split chart symbol">' +
        '<option value="TVC:DXY">DXY</option><option value="TVC:US10Y">US 10Y</option>' +
        '<option value="TVC:GOLD">Gold</option><option value="FOREXCOM:SPXUSD">S&P 500</option>' +
        '<option value="TVC:VIX">VIX</option><option value="FX:EURUSD">EUR/USD</option>' +
        '<option value="BINANCE:BTCUSDT">BTC</option></select></div>' +
        '<div id="macro-focus-chart-b"></div>';
      chart.parentNode.insertBefore(wrap, chart);
      paneA.appendChild(chart);
      wrap.appendChild(paneA);
      wrap.appendChild(paneB);
    }

    if (!document.getElementById('pro-symbol-note') && document.getElementById('desk-tools')) {
      var notePanel = document.createElement('div');
      notePanel.className = 'tool-panel note-panel';
      notePanel.id = 'pro-symbol-note-wrap';
      notePanel.innerHTML =
        '<h3>Symbol note</h3><span class="hint" id="pro-note-label">Focus symbol</span>' +
        '<textarea id="pro-symbol-note" placeholder="Private note for this symbol…"></textarea>' +
        '<div class="journal-actions"><button type="button" class="tool-chip" id="pro-note-save">Save note</button></div>';
      document.getElementById('desk-tools').appendChild(notePanel);
    }

    if (!document.getElementById('pro-ws-host') && document.getElementById('desk-tools')) {
      var ws = document.createElement('div');
      ws.className = 'tool-panel';
      ws.innerHTML = '<h3>Workspaces</h3><span class="hint">Saved desk states</span><div class="ws-list" id="pro-ws-host"></div>';
      document.getElementById('desk-tools').appendChild(ws);
    }

    if (!document.getElementById('pro-ws-modal')) {
      var modal = document.createElement('div');
      modal.id = 'pro-ws-modal';
      modal.className = 'pro-modal-backdrop';
      modal.innerHTML =
        '<div class="pro-modal" role="dialog" aria-label="Save workspace">' +
        '<h3>Save workspace</h3>' +
        '<input type="text" id="pro-ws-name" placeholder="Name (e.g. London open)" maxlength="40" />' +
        '<div class="pro-modal-actions">' +
        '<button type="button" class="tool-chip" id="pro-ws-cancel">Cancel</button>' +
        '<button type="button" class="tool-chip active" id="pro-ws-confirm">Save</button>' +
        '</div></div>';
      document.body.appendChild(modal);
    }
  }

  var SCORE = [
    { s: 'TVC:DXY', label: 'Dollar', hint: 'Liquidity / FX backbone' },
    { s: 'TVC:US10Y', label: 'Yields', hint: 'Policy path proxy' },
    { s: 'FOREXCOM:SPXUSD', label: 'Equities', hint: 'Risk appetite' },
    { s: 'TVC:GOLD', label: 'Gold', hint: 'Hedge / real rates' },
    { s: 'TVC:VIX', label: 'Vol', hint: 'Stress gauge' },
    { s: 'TVC:USOIL', label: 'Oil', hint: 'Growth / inflation' }
  ];

  function renderScoreboard() {
    var host = document.getElementById('pro-scoreboard-host');
    if (!host) return;
    host.innerHTML = '';
    SCORE.forEach(function (item) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'score-card';
      card.innerHTML =
        '<div class="sc-label">' + item.label + '</div>' +
        '<p class="sc-name">' + (NAMES[item.s] || item.s) + '</p>' +
        '<p class="sc-hint">' + item.hint + '</p>';
      card.addEventListener('click', function () {
        var chip = document.querySelector('.symbol-chip[data-symbol="' + item.s + '"], .regime-chip[data-symbol="' + item.s + '"]');
        if (chip) chip.click();
        toast('Focus: ' + (NAMES[item.s] || item.s));
      });
      host.appendChild(card);
    });
  }

  var splitOn = false;
  var splitSymbol = (function () {
    try { return localStorage.getItem(PRO.splitSym) || 'TVC:DXY'; } catch (e) { return 'TVC:DXY'; }
  })();

  function loadSplitChart(symbol) {
    var host = document.getElementById('macro-focus-chart-b');
    if (!host || typeof TradingView === 'undefined') return;
    host.innerHTML = '';
    var interval = 'D';
    try { interval = localStorage.getItem('winemi-macro-interval') || 'D'; } catch (e) {}
    var title = document.getElementById('split-title');
    if (title) title.textContent = NAMES[symbol] || symbol;
    new TradingView.widget({
      container_id: 'macro-focus-chart-b',
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#0e0e10',
      enable_publishing: false,
      hide_top_toolbar: true,
      hide_legend: false,
      save_image: false,
      allow_symbol_change: false,
      height: host.clientHeight || 480,
      width: '100%'
    });
  }

  function setSplit(on) {
    splitOn = !!on;
    var wrap = document.getElementById('split-wrap');
    var btn = document.getElementById('pro-split');
    if (wrap) wrap.classList.toggle('is-off', !splitOn);
    if (btn) btn.classList.toggle('active', splitOn);
    try { localStorage.setItem(PRO.split, splitOn ? '1' : '0'); } catch (e) {}
    if (splitOn) {
      loadSplitChart(splitSymbol);
      toast('Split chart on');
    } else {
      toast('Split chart off');
    }
  }

  var notes = loadJSON(PRO.notes, {});

  function currentFocusSymbol() {
    var active = document.querySelector('.symbol-chip.active, .regime-chip.active');
    if (active) return active.getAttribute('data-symbol');
    var hint = document.getElementById('focus-hint');
    if (hint && hint.textContent) {
      var m = hint.textContent.split('·')[0].trim();
      if (m) return m;
    }
    return 'TVC:US10Y';
  }

  function syncNoteUI() {
    var sym = currentFocusSymbol();
    var ta = document.getElementById('pro-symbol-note');
    var lab = document.getElementById('pro-note-label');
    if (lab) lab.textContent = NAMES[sym] || sym;
    if (ta) ta.value = notes[sym] || '';
  }

  function saveNote() {
    var sym = currentFocusSymbol();
    var ta = document.getElementById('pro-symbol-note');
    if (!ta) return;
    if (ta.value.trim()) notes[sym] = ta.value.trim();
    else delete notes[sym];
    saveJSON(PRO.notes, notes);
    toast('Note saved · ' + (NAMES[sym] || sym));
  }

  var workspaces = loadJSON(PRO.workspaces, []);

  function captureWorkspace() {
    var focus = currentFocusSymbol();
    var interval = 'D';
    try { interval = localStorage.getItem('winemi-macro-interval') || 'D'; } catch (e) {}
    var layout = 'full';
    try { layout = localStorage.getItem('winemi-macro-layout') || 'full'; } catch (e) {}
    var density = 'comfortable';
    try { density = localStorage.getItem('winemi-macro-density') || 'comfortable'; } catch (e) {}
    var wl = [];
    try { wl = JSON.parse(localStorage.getItem('winemi-macro-watchlist') || '[]'); } catch (e) {}
    var panel = (document.querySelector('.desk-tab.active') || {}).getAttribute('data-panel') || 'board';
    return {
      focus: focus,
      interval: interval,
      layout: layout,
      density: density,
      watchlist: wl,
      panel: panel,
      split: splitOn,
      splitSymbol: splitSymbol,
      ts: Date.now()
    };
  }

  function applyWorkspace(ws) {
    if (!ws) return;
    var layoutBtn = document.querySelector('.layout-chip[data-layout="' + (ws.layout || 'full') + '"]');
    if (layoutBtn) layoutBtn.click();
    var densBtn = document.querySelector('.density-chip[data-density="' + (ws.density || 'comfortable') + '"]');
    if (densBtn) densBtn.click();
    var tf = document.querySelector('.tf-chip[data-tf="' + (ws.interval || 'D') + '"]');
    if (tf) tf.click();
    var chip = document.querySelector('.symbol-chip[data-symbol="' + ws.focus + '"], .regime-chip[data-symbol="' + ws.focus + '"]');
    if (chip) chip.click();
    if (ws.panel) {
      var tab = document.querySelector('.desk-tab[data-panel="' + ws.panel + '"]');
      if (tab) tab.click();
    }
    if (ws.watchlist && ws.watchlist.length) {
      try { localStorage.setItem('winemi-macro-watchlist', JSON.stringify(ws.watchlist)); } catch (e) {}
    }
    if (typeof ws.split === 'boolean') {
      splitSymbol = ws.splitSymbol || splitSymbol;
      setSplit(ws.split);
      var sel = document.getElementById('split-symbol');
      if (sel) sel.value = splitSymbol;
    }
    syncNoteUI();
    renderWorkspaces();
    toast('Workspace loaded');
  }

  function renderWorkspaces() {
    var host = document.getElementById('pro-ws-host');
    if (!host) return;
    host.innerHTML = '';
    if (!workspaces.length) {
      host.innerHTML = '<span class="hint">No saved workspaces yet</span>';
      return;
    }
    workspaces.forEach(function (ws, idx) {
      var row = document.createElement('div');
      row.className = 'ws-row';
      var label = document.createElement('span');
      label.textContent = ws.name + ' · ' + (NAMES[ws.data.focus] || ws.data.focus || '');
      label.addEventListener('click', function () { applyWorkspace(ws.data); });
      var rm = document.createElement('button');
      rm.type = 'button';
      rm.setAttribute('aria-label', 'Delete workspace');
      rm.textContent = '×';
      rm.addEventListener('click', function (e) {
        e.stopPropagation();
        workspaces.splice(idx, 1);
        saveJSON(PRO.workspaces, workspaces);
        renderWorkspaces();
        toast('Workspace removed');
      });
      row.appendChild(label);
      row.appendChild(rm);
      host.appendChild(row);
    });
  }

  function openSaveModal() {
    var modal = document.getElementById('pro-ws-modal');
    var input = document.getElementById('pro-ws-name');
    if (!modal) return;
    modal.classList.add('is-open');
    if (input) { input.value = ''; input.focus(); }
  }
  function closeSaveModal() {
    var modal = document.getElementById('pro-ws-modal');
    if (modal) modal.classList.remove('is-open');
  }
  function confirmSaveWorkspace() {
    var input = document.getElementById('pro-ws-name');
    var name = (input && input.value || '').trim();
    if (!name) { toast('Name required'); return; }
    workspaces.unshift({ name: name, data: captureWorkspace() });
    if (workspaces.length > 12) workspaces = workspaces.slice(0, 12);
    saveJSON(PRO.workspaces, workspaces);
    renderWorkspaces();
    closeSaveModal();
    toast('Workspace saved · ' + name);
  }

  function toggleMaxSecondary() {
    var sec = document.querySelector('.desk-secondary');
    var btn = document.getElementById('pro-max-secondary');
    if (!sec) return;
    sec.classList.toggle('is-max');
    var on = sec.classList.contains('is-max');
    if (btn) btn.classList.toggle('active', on);
    toast(on ? 'Secondary maximized' : 'Secondary restored');
  }

  function wire() {
    ensureChrome();
    renderScoreboard();
    renderWorkspaces();
    syncNoteUI();

    var splitBtn = document.getElementById('pro-split');
    if (splitBtn) splitBtn.addEventListener('click', function () { setSplit(!splitOn); });
    try { if (localStorage.getItem(PRO.split) === '1') setSplit(true); } catch (e) {}

    var splitSel = document.getElementById('split-symbol');
    if (splitSel) {
      splitSel.value = splitSymbol;
      splitSel.addEventListener('change', function () {
        splitSymbol = splitSel.value;
        try { localStorage.setItem(PRO.splitSym, splitSymbol); } catch (e) {}
        if (splitOn) loadSplitChart(splitSymbol);
      });
    }

    var scoreBtn = document.getElementById('pro-scoreboard');
    var scoreHost = document.getElementById('pro-scoreboard-host');
    if (scoreBtn && scoreHost) {
      scoreBtn.addEventListener('click', function () {
        scoreHost.hidden = !scoreHost.hidden;
        scoreBtn.classList.toggle('active', !scoreHost.hidden);
      });
    }

    var noteSave = document.getElementById('pro-note-save');
    if (noteSave) noteSave.addEventListener('click', saveNote);
    var noteFocus = document.getElementById('pro-note-focus');
    if (noteFocus) {
      noteFocus.addEventListener('click', function () {
        var wrap = document.getElementById('pro-symbol-note-wrap');
        if (wrap) {
          wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          var ta = document.getElementById('pro-symbol-note');
          if (ta) ta.focus();
        }
        syncNoteUI();
      });
    }

    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && (t.classList.contains('symbol-chip') || t.classList.contains('regime-chip') || t.classList.contains('history-chip'))) {
        setTimeout(syncNoteUI, 50);
      }
    });

    var wsSave = document.getElementById('pro-ws-save');
    if (wsSave) wsSave.addEventListener('click', openSaveModal);
    var wsLoad = document.getElementById('pro-ws-load');
    if (wsLoad) {
      wsLoad.addEventListener('click', function () {
        var host = document.getElementById('pro-ws-host');
        if (host) host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (!workspaces.length) toast('No workspaces saved');
      });
    }
    var wsCancel = document.getElementById('pro-ws-cancel');
    if (wsCancel) wsCancel.addEventListener('click', closeSaveModal);
    var wsConfirm = document.getElementById('pro-ws-confirm');
    if (wsConfirm) wsConfirm.addEventListener('click', confirmSaveWorkspace);
    var wsModal = document.getElementById('pro-ws-modal');
    if (wsModal) {
      wsModal.addEventListener('click', function (e) {
        if (e.target === wsModal) closeSaveModal();
      });
    }
    var wsName = document.getElementById('pro-ws-name');
    if (wsName) {
      wsName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); confirmSaveWorkspace(); }
        if (e.key === 'Escape') closeSaveModal();
      });
    }

    var maxBtn = document.getElementById('pro-max-secondary');
    if (maxBtn) maxBtn.addEventListener('click', toggleMaxSecondary);

    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;
      var k = e.key.toLowerCase();
      if (k === 's' && !e.metaKey && !e.ctrlKey) { setSplit(!splitOn); e.preventDefault(); }
      if (k === 'w' && !e.metaKey && !e.ctrlKey) { openSaveModal(); e.preventDefault(); }
      if (k === 'm' && !e.metaKey && !e.ctrlKey) { toggleMaxSecondary(); e.preventDefault(); }
    });

    var help = document.getElementById('shortcut-help');
    if (help && !help.querySelector('[data-pro-keys]')) {
      var dl = help.querySelector('dl');
      if (dl) {
        var mark = document.createElement('span');
        mark.setAttribute('data-pro-keys', '1');
        mark.style.display = 'none';
        help.appendChild(mark);
        [['S','Split chart'],['W','Save workspace'],['M','Max secondary']].forEach(function (pair) {
          var dt = document.createElement('dt'); dt.textContent = pair[0];
          var dd = document.createElement('dd'); dd.textContent = pair[1];
          dl.appendChild(dt); dl.appendChild(dd);
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(wire, 50); });
  } else {
    setTimeout(wire, 50);
  }
})();
