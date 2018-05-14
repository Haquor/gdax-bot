# gdax-bot
[![Build status](https://ci.appveyor.com/api/projects/status/github/Isonyx/gdax-bot?svg=true)](https://ci.appveyor.com/project/Isonyx/gdax-bot)

GDAX-bot is designed to be a GDAX based MongoDB powered crypto-currency trading bot.

It is currently being used for research and market analysis, but in time, we hope to achieve the following:

  - Support multiple Exchanges (e.g. Polinex, Kraken, Bitfinex, Binance)
  - Run custom TA strategies
  - Perform magic!

### Project Contributors

Dillinger uses a number of open source projects to work properly:

* [GDAX Node](https://github.com/coinbase/gdax-node) - a node library by GDAX, for GDAX
* [MongoDB](https://www.mongodb.com) - Database software that holds JSON-like documents
* [Chalk](https://github.com/chalk/chalk) - terminal string styling, done right

And of course gdax-bot itself is open source with a [public repository](https://github.com/Isonyx/gdax-bot) on GitHub.

### Installation

gdax-bot requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the bot.

```sh
$ cd gdax-bot
$ npm install -d
$ node bot.js --config config.xml --option
```

License
----

MIT

**Free Software, Hell Yeah!**
