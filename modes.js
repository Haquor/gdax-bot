#!/usr/bin/env node
'use strict';

const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));
const product = require(path.resolve( __dirname, "./exchange.js" ));
const db = require(path.resolve( __dirname, "./database.js" ));
const babel = require('babel-register');

class Modes {
  //Handles database and pre-program directives

  constructor(mode, config) {
    if (mode == 'live') this.live(config);
    if (mode == 'backtest') this.backtest(config);
  }

  live(config) {
    ui.log('Running bot in LIVE mode initiated.', 'z');
    new product(config[0], new db(1));
  }

  backtest(config) {
    ui.log('Running bot in BACKTESTING mode', 'e');
    new product(config[0], new db(2));
  }


}

module.exports = Modes;
