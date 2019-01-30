#!/usr/bin/env node
'use strict';

var lib = require(path.resolve( __dirname, "./../libraries.js" ));

class Ticker {

  constructor() {
    _modules.ui.log("LIVE ORDERBOOK");
    _modules.ui.log("Price:    | Bid:      | Ask:      | Sequence:        ");
    myDB._initDB();
  }

  log(trade) {
      trade.price = parseFloat(trade.price, 3).toFixed(2);
      trade.best_bid =  parseFloat(trade.best_bid, 3).toFixed(2);
      trade.best_ask = parseFloat(trade.best_ask, 3).toFixed(2);

      var aboutDB = myDB.log(trade);

      aboutDB.then(function(result) {
        //_modules.ui.log(trade.price  + "      " + trade.best_bid + "      " + trade.best_ask + "      " + trade.sequence);
      }, function(err) {
        _modules.ui.log("BAD ERROR: " + err, 'e');
      });

      var procDB = myDB.log(trade, "process");

      procDB.then(function(result) {
      }, function(err) {
        _modules.ui.log("BAD ERROR: " + err, 'e');
      });

  }


}

module.exports = Ticker;
