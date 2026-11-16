/**
 * WINEMI CAPITAL — Instrument catalogue (metadata only).
 * Prices are never fabricated; live values come from TradingView embeds.
 */
(function (global) {
  'use strict';

  var INSTRUMENTS = [
    { id: 'sp500', name: 'S&P 500', symbol: 'SPX', tv: 'FOREXCOM:SPXUSD', asset: 'indices', region: 'US' },
    { id: 'nasdaq100', name: 'NASDAQ 100', symbol: 'NDX', tv: 'NASDAQ:NDX', asset: 'indices', region: 'US' },
    { id: 'dow', name: 'Dow Jones', symbol: 'DJI', tv: 'FOREXCOM:DJI', asset: 'indices', region: 'US' },
    { id: 'dax', name: 'DAX', symbol: 'DAX', tv: 'XETR:DAX', asset: 'indices', region: 'EU' },
    { id: 'ftse', name: 'FTSE 100', symbol: 'UKX', tv: 'TVC:UKX', asset: 'indices', region: 'UK' },
    { id: 'nikkei', name: 'Nikkei 225', symbol: 'NI225', tv: 'TVC:NI225', asset: 'indices', region: 'JP' },
    { id: 'dxy', name: 'US Dollar Index', symbol: 'DXY', tv: 'TVC:DXY', asset: 'forex', region: 'US' },
    { id: 'eurusd', name: 'EUR / USD', symbol: 'EURUSD', tv: 'FX:EURUSD', asset: 'forex', region: 'G10' },
    { id: 'gbpusd', name: 'GBP / USD', symbol: 'GBPUSD', tv: 'FX:GBPUSD', asset: 'forex', region: 'G10' },
    { id: 'usdjpy', name: 'USD / JPY', symbol: 'USDJPY', tv: 'FX:USDJPY', asset: 'forex', region: 'G10' },
    { id: 'audusd', name: 'AUD / USD', symbol: 'AUDUSD', tv: 'FX:AUDUSD', asset: 'forex', region: 'G10' },
    { id: 'usdcad', name: 'USD / CAD', symbol: 'USDCAD', tv: 'FX:USDCAD', asset: 'forex', region: 'G10' },
    { id: 'gold', name: 'Gold', symbol: 'XAUUSD', tv: 'TVC:GOLD', asset: 'commodities', region: 'Global' },
    { id: 'silver', name: 'Silver', symbol: 'XAGUSD', tv: 'TVC:SILVER', asset: 'commodities', region: 'Global' },
    { id: 'wti', name: 'WTI Crude Oil', symbol: 'USOIL', tv: 'TVC:USOIL', asset: 'commodities', region: 'US' },
    { id: 'brent', name: 'Brent Crude', symbol: 'UKOIL', tv: 'TVC:UKOIL', asset: 'commodities', region: 'Global' },
    { id: 'us10y', name: 'US 10-Year Yield', symbol: 'US10Y', tv: 'TVC:US10Y', asset: 'bonds', region: 'US' },
    { id: 'us02y', name: 'US 2-Year Yield', symbol: 'US02Y', tv: 'TVC:US02Y', asset: 'bonds', region: 'US' },
    { id: 'vix', name: 'CBOE VIX', symbol: 'VIX', tv: 'TVC:VIX', asset: 'volatility', region: 'US' },
    { id: 'btc', name: 'Bitcoin', symbol: 'BTCUSD', tv: 'BITSTAMP:BTCUSD', asset: 'crypto', region: 'Global' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETHUSD', tv: 'BITSTAMP:ETHUSD', asset: 'crypto', region: 'Global' }
  ];

  var ASSET_LABELS = {
    all: 'All',
    indices: 'Indices',
    forex: 'Forex',
    commodities: 'Commodities',
    bonds: 'Bonds & Yields',
    volatility: 'Volatility',
    crypto: 'Crypto'
  };

  function byId(id) {
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      if (INSTRUMENTS[i].id === id) return INSTRUMENTS[i];
    }
    return null;
  }

  function byAsset(asset) {
    if (!asset || asset === 'all') return INSTRUMENTS.slice();
    return INSTRUMENTS.filter(function (x) { return x.asset === asset; });
  }

  function instrumentUrl(id, inPages) {
    var base = inPages ? 'instrument.html' : 'pages/instrument.html';
    return base + '?id=' + encodeURIComponent(id);
  }

  function watchlistStore() {
    var KEY = 'winemi-watchlist-v1';
    function read() {
      try {
        var raw = localStorage.getItem(KEY);
        var arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
      } catch (e) { return []; }
    }
    function write(ids) {
      try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) {}
    }
    return {
      list: function () { return read(); },
      has: function (id) { return read().indexOf(id) !== -1; },
      add: function (id) {
        var cur = read();
        if (cur.indexOf(id) === -1) { cur.push(id); write(cur); }
        return cur;
      },
      remove: function (id) {
        write(read().filter(function (x) { return x !== id; }));
        return read();
      },
      toggle: function (id) {
        return this.has(id) ? this.remove(id) : this.add(id);
      }
    };
  }

  global.WinemiMarkets = {
    instruments: INSTRUMENTS,
    assetLabels: ASSET_LABELS,
    byId: byId,
    byAsset: byAsset,
    instrumentUrl: instrumentUrl,
    watchlist: watchlistStore()
  };
})(window);
