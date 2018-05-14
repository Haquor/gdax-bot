#!/usr/bin/env node
'use strict';

const Gdax = require('gdax');
const path = require('path');
const ui = new (require(path.resolve(__dirname, "./ui.js")));
const packet = new (require(path.resolve(__dirname, "./packet.js")));

class exchange {
  constructor(product) {
    this.product = product;

    this.websocket = new Gdax.WebsocketClient([this.product]);
    this._initSocket();
  }

  _initSocket() {
    this.websocket.on('message', data => {
      packet.parse(data);
    });
    this.websocket.on('open', () => {
      this.websocket.subscribe({ product_ids: [this.product], channels: ['ticker'] });
      ui.log('Requested the ticker channel for ' + this.product, 'z');
    });
    this.websocket.on('error', (err) => {
      ui.log(err, 'e');
    });

  }
}

module.exports = exchange;
