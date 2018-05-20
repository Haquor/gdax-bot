#!/usr/bin/env node
'use strict';

const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));

class Ticker {
  /*
    "type": "ticker",
    "trade_id": 20153558,
    "sequence": 3262786978,
    "time": "2017-09-02T17:05:49.250000Z",
    "product_id": "BTC-USD",
    "price": "4388.01000000",
    "side": "buy", // Taker side
    "last_size": "0.03000000",
    "best_bid": "4388",
    "best_ask": "4388.01"
  */


  constructor() {
    ui.log("LIVE ORDERBOOK");
    ui.log("Price:    | Bid:      | Ask:      | Sequence:        ");
    //Create mongo DB in the main thread (create an event)
    // initialize mongo DB
  }

  log(trade) {
      //Number.parseFloat(data.best_bid, 3).toFixed(2)
      trade.price = parseFloat(trade.price, 3).toFixed(2);
      trade.best_bid =  parseFloat(trade.best_bid, 3).toFixed(2);
      trade.best_ask = parseFloat(trade.best_ask, 3).toFixed(2);

      // Log to mongo DB
      ui.log(trade.price  + "      " + trade.best_bid + "      " + trade.best_ask + "      " + trade.sequence);
  }


}

module.exports = Ticker;
