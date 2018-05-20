#!/usr/bin/env node
'use strict';

const path = require('path');
const mongo = require('mongodb');
const url = "monogdb://localhost:27017/";

class Database {

  constructor(mode) {
    if (mode == 1) { this.name = 'live' }
    if (mode == 1) { this.name = 'backtest' }
    this.init();
  }

  init() {
    this.client = mongo.MongoClient;
    this.client.connect(url + this.name, function(err, db) {
      if (err) throw err;
      ui.log("Database created!", 'g');
    });
  }

  log(data) {

  }
}

module.exports = Database;
