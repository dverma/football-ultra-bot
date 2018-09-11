'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(process.env.BOT_API_TOKEN,{
    webAdmin: {
        port: process.env.PORT
    }
});
const AboutController = require('./controllers/about');
const OtherwiseController = require('./controllers/otherwise');

tg.router.when(new Telegram.TextCommand('/about', 'aboutCommand'), new AboutController())
    .otherwise(new OtherwiseController());

// Keep alive fix for heroku as heroku apps sleep after 1 hour of inactivity
// This setInterval code snippet will ping the app every 5 mins
const https = require("https");
setInterval(function() {
    //https.get("https://radiant-brook-90824.herokuapp.com");
}, 300000);