#!/usr/bin/env node
'use strict';

const math = require('mathjs');
const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));
const Ticker = require(path.resolve(__dirname, "./ticker.js"));
const babel = require('babel-register');

class Packet {
  constructor()
  {
    this.onStart = null;
    this.ticker = new ticker();
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
          ui.log('Subscribed to ' + chans[key].name + ' channel.', 'p');
        });
        break;
      case "ticker":
        if (!(data.time == undefined)) {
          //overhaul onStart for a smarter way of checking firstRun
          if (!this.onStart) {
            this.onStart = 1;
            this.ticker = new ticker();
          }
          this.ticker.log(data);
        }
        //ui.log(data.time + "    Signals for " + data.product_id + ": price change " + data.price + " on [" + data.side + "] side.", 'g');what we be doin e40
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

module.exports = Packet;
