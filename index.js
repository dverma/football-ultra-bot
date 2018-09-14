'use strict';

const Telegram = require('telegram-node-bot');
const tg = new Telegram.Telegram(process.env.BOT_API_TOKEN, {
    webAdmin: {
        port: process.env.PORT
    }
});

const AboutController = require('./controllers/about');
const OtherwiseController = require('./controllers/otherwise');
const LiveController = require('./controllers/live');
const FixturesController = require('./controllers/fixtures');
const StandingsController = require('./controllers/standings');
const ScorersController = require('./controllers/scorers');

tg.router.when(new Telegram.TextCommand('/about', 'aboutCommand'), new AboutController())
    .when(new Telegram.TextCommand('/start', 'aboutCommand'), new AboutController())
    .when(new Telegram.TextCommand('/live', 'liveCommand'), new LiveController())
    .when(new Telegram.TextCommand('/fixtures', 'fixturesCommand'), new FixturesController())
    .when(new Telegram.TextCommand('/standings', 'standingsCommand'), new StandingsController())
    .when(new Telegram.TextCommand('/scorers', 'scorersCommand'), new ScorersController())
    .otherwise(new OtherwiseController());

// Keep alive fix for heroku as heroku apps sleep after 1 hour of inactivity
// This setInterval code snippet will ping the app every 10 mins
const https = require("https");
setInterval(function () {
    https.get("https://football-ultra-bot.herokuapp.com");
}, 600000);