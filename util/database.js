#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js' ));

const url = "mongodb://localhost:27017/";
global.dbo = null;
global.theDB = null;

//Marked for heavy review

class Database {

    constructor(mode) {
      this.name = mode;
    }
  
    _initDB() {
      this.client = _modules.mongo.MongoClient;
      var dbn = this.name;
      var type = this.type;
  
      theDB = this.client;
      this.client.connect(url, function(err, db) {
        if (err) _modules.terminal.log(err, 'e');
        dbo = db.db(dbn);
        dbo.createCollection(type, function(err, res) {
          if (err) _modules.terminal.log(err, 'e');
        });
      });
    }
  
    setType(type) {
      this.type = type;
    }
  
    getType() {
      return this.type;
    }
  
    log(data, store) {
      var theSpace
      if (store != undefined) { theSpace = store; }
      else { theSpace = this.type; }
      return new Promise(function(resolve, reject) {
        if (dbo != null) {
          dbo.collection(theSpace).insertOne(data, function(err, res) {
            if (err) {
              reject("Error encountered " + err);
            } else {
              resolve("Inserted DB record ");
            }
          });
        }
      });
    }
    
  }
  
  module.exports = Database;
  