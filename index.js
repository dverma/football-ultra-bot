'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(process.env.BOT_API_TOKEN,{
    webAdmin: {
        port: process.env.PORT
    }
});


//const tg = new Telegram.Telegram('622194918:AAFVTR7BIIwy8HMPPqfH1E8gcun2aiaCbe0');

const AboutController = require('./controllers/about');
const OtherwiseController = require('./controllers/otherwise');
const LiveController = require('./controllers/live');


tg.router.when(new Telegram.TextCommand('/about', 'aboutCommand'), new AboutController())
    .when(new Telegram.TextCommand('/live', 'liveCommand'), new LiveController())
    .otherwise(new OtherwiseController());


// Keep alive fix for heroku as heroku apps sleep after 1 hour of inactivity
// This setInterval code snippet will ping the app every 5 mins
const https = require("https");
const DAO = require('./controllers/dao');
setInterval(function() {
    https.get("https://football-ultra-bot.herokuapp.com/");
}, 300000);

setInterval(function() {
    DAO.writeMatchDay;
}, 60000);