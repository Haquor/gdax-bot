#!/usr/bin/env node
'use strict';

var lib = require(path.resolve( __dirname, "./../libraries.js" ));

class UI {
  constructor()
  {
  }

  log(msg, type) {
    // Text color library
    if (type == 'e') msg = _modules.chalk.red.bold.underline(msg);
    if (type == 'n') msg = _modules.chalk.green.bold.underline(msg);
    if (type == 'p') msg = _modules.chalk.bold.green(msg);
    if (type == 'g') msg = _modules.chalk.bold.yellow(msg);
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
