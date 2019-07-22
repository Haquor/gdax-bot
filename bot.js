#!/usr/bin/env node
'use strict';

global.myDB = null;

var path = require('path');
require(path.resolve( __dirname, './route.js' ));

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
    .alias('d', 'disc')
    .nargs('d', 0)
    .describe('d', 'Discord integration token')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright isonyx 2019')
    .argv;

if (args.disc) {
    _modules.terminal.int_Discord(args.disc);
}
    

var login = ['', '', '']

var config_file = JSON.parse(_modules.fs.readFileSync(args.config));

// If user is not a guest, pull login info
if (!config_file.hasOwnProperty('guest')) {
    _modules.terminal.log('Attempting authenticated user login');
    login = [config_file['key'], config_file['secret'], config_file['passphrase']];
}


var config = ['BTC-USD', login];

if (args.run) {
    myDB = new _modules.database('live');
    new _modules.exchange(config[0], config[1]);
    _modules.terminal.log('Running bot in LIVE mode', 'e');
}
if (args.backtest) {
    console.log('ABOUT TO BACKTEST');
    //myDB = new _modules.database('backtest');
    _modules.terminal.log('Backtesting is not enabled yet');
}
