#!/usr/bin/env node
'use strict';

const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));
const babel = require('babel-register');

class packet {
  constructor() { }

  parse(data) {
    switch (data.type) {
      case "open":
        break;
      case "received":
        break;
      case "done":
        break;
      case "subscriptions":
        // Needs more detailed parsing
        var chans = data.channels;
        Object.keys(chans).forEach(function(key) {
          ui.log('Subscribed to ' + chans[key].name + ' channel.', 'p');
        });
        break;
      case "ticker":
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
        ui.log(data.time + "    Signals for " + data.product_id + ": price change " + data.price + " on [" + data.side + "] side.", 'g');
        break;
      case "heartbeat":
        break;
      case "match":
        break;
      default:
        ui.log('Unhandled packet type: ' + data.type, 'e');
        break;
    }
  }

}

module.exports = packet;
