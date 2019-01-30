#!/usr/bin/env node
'use strict';

global.myDB = null;

var lib = require(path.resolve( __dirname, "./../libraries.js" ));

class Modes {
  //Handles database and pre-program directives

  constructor(mode, config) {
    myDB = new _modules.database(mode);
    _modules.ui.log("Running bot in " + mode + " mode.", 'e');
    new _modules.exchange(config[0]);
  }

}

module.exports = Modes;
