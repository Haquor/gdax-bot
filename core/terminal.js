#!/usr/bin/env node
'use strict';

var path = require('path');
require(path.resolve( __dirname, './../route.js' ));

global.replyMsg = false;
global.replyOn = false;
global.discordClient = '';
global.dReady = false;

class Terminal {
    constructor() {
    }

    int_Discord(token) {

      global.discordClient = new _modules.Discord.Client()
      global.discordClient.login(token)
      global.discordClient.on("ready", () => {
        global.dReady = true;
        global.discordClient.channels.get('446896878366228492').send(
          '```python\n' +
          'LAIN is designed to be a GDAX based MongoDB powered crypto-currency trading bot\n' +
          'It is currently being used for research and market analysis, but in time, we hope to achieve the following\n' +
          '\n' +
          '       - Support multiple Exchanges (e.g. Polinex, Kraken, Bitfinex, Binance)\n' +
          '       - Run custom TA strategies\n' +
          '       - Integrate with Discord\n' +
          '       - Perform magic!\n' +
          '\n' +
          '\n' +
          'Usage: !command option message\n' +
          '     e.g !log\n' +
          '\n' +
          'Options:\n' +
          '       !version        Show version number                \n' +
          '       !log            Turn output on/off                 \n' +
          '       !help           Show help                          \n' +
          '       !clr            Deletes last 100 msgs              \n' +
          '```');
      });


      global.discordClient.on("message", function(message) {
        if(message.author.bot) return;
        
        if(message.content.indexOf("!") !== 0) return;
        
        const args = message.content.slice(1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        

        if(command === "log") {  
          global.replyOn = !global.replyOn;
          global.replyMsg = message; 
        }

        if (command === "clr") {
            async function clear() {
                message.delete();
                const fetched = await message.channel.fetchMessages({limit: 99});
                const filt = fetched.filter(message => message.author.bot)
                message.channel.bulkDelete(filt);
                message.channel.send('```python\nIf you’re not remembered, then you never existed.```');
            }
            clear();
        }

      });
    }

    log(msg, type) {
       //Add levels of logging that can be enabled or disabled e.g. --logging 1
        if (type == 'ru') msg = _modules.chalk.red.bold.underline(msg);
        if (type == 'gu') msg = _modules.chalk.green.bold.underline(msg);
        if (type == 'yu') msg = _modules.chalk.green.bold.underline(msg);
        if (type == 'g') msg = _modules.chalk.bold.green(msg);
        if (type == 'r') msg = _modules.chalk.bold.red(msg);
        if (type == 'y') msg = _modules.chalk.bold.yellow(msg);
        console.log(this.stamp() + '     ' + msg);
        if (global.replyOn) global.replyMsg.channel.send('```python\n ' + this.stamp() + '     ' + msg + '```');
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