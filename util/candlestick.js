#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js' ));
const MongoClient = require('mongodb').MongoClient

class Candlestick {

  constructor(period) {
    //Period is measured in seconds
    this.period = period;
    var time = ((period * 60) / 0.001);
    setInterval(this.update, time);
  }

  update() {
    //Find everything in the ticker collection and create candlestick data
    //Log the candlestick data
    var open = "", high = "", low = "", close = "";
    var prices = [];

    if (dbo != null) {
        dbo.collection('process').find({}).toArray(function(err, result) {
            _modules.terminal.log(result);
            if (err) throw err;
            open = result[0].price;
            close = result[result.length - 1].price;
            result.forEach(function(value) {
                prices.push(value.price);
            });
            high = math.max.apply(null, prices);
            low = math.min.apply(null, prices);
            _modules.terminal.log(open + "," + high + "," + low + "," + close);
        });
        dbo.collection('process').drop();
    }

    var cStick = myDB.log(dbo.collection('ticker').count(), "candlestick");

    cStick.then(function(result) {
      //_modules.terminal.log(("Updated candlestick data.");
    }, function(err) {
      _modules.terminal.log("BAD ERROR: " + err, 'e');
    });

  }

}

module.exports = Candlestick;
