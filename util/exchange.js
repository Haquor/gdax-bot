#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js'));

class Exchange {
    constructor(product, creds) {
        this.onStart = null;
        this.authedClient = null;
        this.product = product;

        if (creds[0] != '') {
            this.login(creds, function(err, tryLogin) {
                _modules.terminal.log('Attempting to login with credentials: ' + creds);
                if (err) {
                    _modules.terinal.log(err.login);
                } else {
                    this.connect(product, function(err, tryConnect) {
                        _modules.terminal.log('Attempting to connect to GDAX ' + product);
                        if (err) {
                            _modules.terinal.log(err.connect);
                        } else {
                            this.monitor(tryConnect);
                        }
                    });
                }
            });
        } else {
            this.monitor(this.connect(product));
        }

    }

    login(credentials) {

        this.authedClient = new _modules.CoinbasePro.AuthenticatedClient(
            credentials[0],
            credentials[1],
            credentials[2],
            'https://api.pro.coinbase.com'
          );

        return this.authedClient;
    }

    connect(currency_pair) {
        return new _modules.Gdax.WebsocketClient([currency_pair]);
    }

    monitor(socket) {
        socket.on('message', data => {
            if (global.dReady) {
                global.discordClient.user.setActivity(`Watching ${this.product}`);
                global.dReady = !global.dReady;
            }
            this.parse(data);
        });
        socket.on('open', () => {
            if (global.dReady) {
                 _modules.terminal.log('Watching product');
            }
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