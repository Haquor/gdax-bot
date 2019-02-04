#!/usr/bin/env node
'use strict';

global.path = require('path');

global._modules = {
    path:  require('path'),
    maths: require('mathjs'),
    babel: require('babel-register'),
    mongo: require('mongodb'),
    Gdax: require('gdax'),
    os: require('os'),
    chalk: require('chalk')
}

//Don't repeat file names
//File name becomes _modules[file]

var normalizedPath = require('path').join(__dirname, 'core/');

//Automatically instantiate core folder modules
require('fs').readdirSync(normalizedPath).forEach(function(file) {
  _modules[file.split('.')[0]] = new(require(require('path').resolve(__dirname, './core/' + file)));
});

normalizedPath = require('path').join(__dirname, 'util/');

require('fs').readdirSync(normalizedPath).forEach(function(file) {
  _modules[file.split('.')[0]] = require(require('path').resolve(__dirname, './util/' + file));
});

