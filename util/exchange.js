#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js'));

class Exchange {
    constructor(product, creds) {
        this.onStart = null;
        this.creds = this.login(creds);
        this.product = product;
        try {
            var attempt = this.connect(product);
        } catch (error) {
            _modules.terminal.log(attempt, 'e')
        }
        this.monitor(attempt);
    }

    login(credentials) {
        // Function placeholder: login functionality
        return credentials;
    }

    connect(currency_pair) {
        return new _modules.Gdax.WebsocketClient([currency_pair]);
    }

    monitor(socket) {
        socket.on('message', data => {
            this.parse(data);
        });
        socket.on('open', () => {
           socket.subscribe({ product_ids: [this.product], channels: ['ticker'] });
            _modules.terminal.log('Requested the ticker channel for ' + this.product, 'z');
            myDB.setType("ticker");
        });
        socket.on('error', (err) => {
            _modules.terminal.log(err, 'e');
        });
    }

    parse(data) {
        this.call(data.type, data);
    }

    open(data) {

    }

    received(data) {

    }

    done(data) {

    }

    subscriptions(data) {
        var chans = data.channels;
        Object.keys(chans).forEach(function(key) {
            _modules.terminal.log('Subscribed to ' + chans[key].name + ' channel.', 'p');
        })
    }

    ticker(data) {
        if (!(data.time == undefined)) {
            if (!this.onStart) {
              this.onStart = 1;

              this.candleObj = new _modules.candlestick(5);
              this.tickerObj = new _modules.ticker();
            }
            this.tickerObj.log(data);
        }
        var color = 'r';
        if (data.side == 'buy') { color = 'g'; }
        //_modules.terminal.log(data.time + "    Signals for " + data.product_id + ": price change " + data.price + " on [" + data.side + "] side.", color);
    }

    heartbeat(data) {

    }

    match(data) {

    }

    call(func, params) {
        this[func](params);
    }

}

module.exports = Exchange;