#!/usr/bin/env node
'use strict';

const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));
const product = require(path.resolve( __dirname, "./exchange.js" ));

class MODES {

  constructor(mode, config) {
    if (mode == 'live') this.live(config);
    if (mode == 'backtest') this.backtest(config);
  }

  live(config) {
    ui.log('Running bot in LIVE mode initiated.', 'z');
    new product(config[0]);
  }

  backtest(config) {
    ui.log('Running bot in BACKTESTING mode', 'e');
  }
}

module.exports = MODES;
