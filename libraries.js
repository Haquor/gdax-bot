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

var normalizedPath = require("path").join(__dirname, "lib/");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  _modules[file.split(".")[0]] = new(require(require('path').resolve(__dirname, "./lib/" + file)));
});
