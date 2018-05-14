#!/usr/bin/env node
'use strict';

const os = require("os");
const chalk = require("chalk");
const babel = require('babel/register');

class UI {
  constructor() { }

  log(msg, type) {
    // Text color library
    if (type == 'e') msg = chalk.red.bold.underline(msg);
    if (type == 'n') msg = chalk.green.bold.underline(msg);
    if (type == 'p') msg = chalk.bold.green(msg);
    if (type == 'g') msg = chalk.bold.yellow(msg);
    console.log(this.stamp() + "     " + msg);
  }

  stamp() {
    var now = new Date();

    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";

    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;

    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }

    return date.join("/") + " " + time.join(":") + " " + suffix;
  }

}

module.exports = UI;
