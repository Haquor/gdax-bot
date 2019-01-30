#!/usr/bin/env node
'use strict';

var lib = require(path.resolve( __dirname, "./../libraries.js" ));

class Packet {
  constructor()
  {
    this.onStart = null;
  }

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
          _modules.ui.log('Subscribed to ' + chans[key].name + ' channel.', 'p');
        });
        break;
      case "ticker":
        if (!(data.time == undefined)) {
          //overhaul onStart for a smarter way of checking firstRun
          if (!this.onStart) {
            this.onStart = 1;
            // start listener that scans DB for candlestick data
            new _modules.candlestick(5);
            this.ticker = new _modules.ticker();
          }
          this._modules.ticker.log(data);
        }
        //_modules.ui.log(data.time + "    Signals for " + data.product_id + ": price change " + data.price + " on [" + data.side + "] side.", 'g');
        break;
      case "heartbeat":
        break;
      case "match":
        break;
      default:
        _modules.ui.log('Unhandled packet type: ' + data.type, 'e');
        break;
    }
  }

}

module.exports = Packet;
