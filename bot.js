#!/usr/bin/env node
'use strict';

//Creation Notes:
//Port all code to use promises

const path = require('path');
const modes = require(path.resolve( __dirname, "./modes.js" ));
const babel = require('babel-register');

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
var login = ['2ce769bdbfe68cbbeb27712f9249ccf9',
            'gJFYCRWvfBZu1Twg84W2Ng2vws98lWVCRK3MEbCCVvSxqYI+WRSQmKCJSxy5+3sIWId38V0Db5zM0+vg3EqqAQ==',
            'p3pafc65azf']

// Functional placeholder: parse config file
var config = ['ETH-USD', login];

if (args.run) new modes("live", config);
if (args.backtest) new modes("backtest", config);
