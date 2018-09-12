'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(process.env.BOT_API_TOKEN,{
    webAdmin: {
        //port: process.env.PORT
        port: 7777,
        host: 'localhost'
    }
});

const AboutController = require('./controllers/about');
const OtherwiseController = require('./controllers/otherwise');
const LiveController = require('./controllers/live');

tg.router.when(new Telegram.TextCommand('/about', 'aboutCommand'), new AboutController())
    .when(new Telegram.TextCommand('/live', 'liveCommand'), new LiveController())
    .otherwise(new OtherwiseController());