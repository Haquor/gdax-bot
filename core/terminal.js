#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js' ));

class Terminal {
    constructor() {}

    log(msg, type) {
       //Add levels of logging that can be enabled or disabled e.g. --logging 1
        if (type == 'ru') msg = _modules.chalk.red.bold.underline(msg);
        if (type == 'gu') msg = _modules.chalk.green.bold.underline(msg);
        if (type == 'yu') msg = _modules.chalk.green.bold.underline(msg);
        if (type == 'g') msg = _modules.chalk.bold.green(msg);
        if (type == 'r') msg = _modules.chalk.bold.red(msg);
        if (type == 'y') msg = _modules.chalk.bold.yellow(msg);
        console.log(this.stamp() + '     ' + msg);
    }

    stamp() {
        var now = new Date();
    
        var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
        var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
        var suffix = (time[0] < 12) ? 'AM' : 'PM';
    
        time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
        time[0] = time[0] || 12;
    
        for (var i = 1; i < 3; i++) {
          if (time[i] < 10) {
            time[i] = '0' + time[i];
          }
        }
    
        return date.join('/') + ' ' + time.join(':') + ' ' + suffix;
      }
}

module.exports = Terminal;