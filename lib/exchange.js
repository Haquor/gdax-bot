#!/usr/bin/env node
'use strict';

var lib = require(path.resolve( __dirname, "./../libraries.js" ));

class Exchange {
  constructor(product) {
    this.product = product;

    this.websocket = new _modules.Gdax.WebsocketClient([this.product]);
    this._initSocket();
  }

  _initSocket() {
    this.websocket.on('message', data => {
      packet.parse(data);
    });
    this.websocket.on('open', () => {
      this.websocket.subscribe({ product_ids: [this.product], channels: ['ticker'] });
      ui.log('Requested the ticker channel for ' + this.product, 'z');
      myDB.setType("ticker");
    });
    this.websocket.on('error', (err) => {
      ui.log(err, 'e');
    });

  }
}

module.exports = Exchange;
