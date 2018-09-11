'use strict';

const Telegram = require("telegram-node-bot");

class LiveController extends Telegram.TelegramBaseCallbackQueryController{
    /**
     * @param {Scope} $
     */
    liveHandler($) {
        $.runMenu({
            message: 'Select a league:',
            layout: 2,
            'Serie A': () => {}, //will be on first line
            'Premier League': () => {}, //will be on first line
            'La Liga': () => {}, //will be on second line
            'Champions League': () => {
                $.sendMessage('--- The Champions ---\n');
                $.sendPhoto({ url: 'https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_Champions_League_logo_2.svg', filename: 'UCL.jpg'})
            }
        });
    }

    get routes() {
        return {
            'liveCommand': 'liveHandler'
        };
    }
}