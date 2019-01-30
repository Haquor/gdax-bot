#!/usr/bin/env node
'use strict';

// Holds all configs and run options

var path = require('path');
var modes = require(path.resolve( __dirname, "./libraries.js" ));

const args = require('yargs')
    .usage('Usage: $0 option message \n e.g $0 -c config_file')
    .alias('c', 'config')
    .nargs('c', 1)
    .describe('c', 'Configuration file path')
    .demandOption(['c'])
    .alias('r', 'run')
    .nargs('r', 0)
    .describe('r', 'Run in live mode')
    .alias('b', 'backtest')
    .nargs('b', 0)
    .describe('b', 'Backtesting mode')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright isonyx 2018')
    .argv;

// Function placeholder: login functionality
var login = ['',
            '',
            '']

// Functional placeholder: parse config file
var config = ['ETH-USD', login];

if (args.run) new _modules.modes("live", config);
if (args.backtest) new _modules.modes("backtest", config);
