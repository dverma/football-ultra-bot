'use strict';

const Telegram = require("telegram-node-bot");

class LiveController extends Telegram.TelegramBaseController{
    /**
     * @param {Scope} $
     */
    liveHandler($) {
        $.runMenu({
            message: 'Select a competition:',
            layout: [3, 1, 1],
            'Serie A': () => {
                $.sendMessage('Serie A');
            }, //will be on first line
            'La Liga': () => {}, //will be on second line
            'Premier League': () => {}, //will be on second line
            'Champions League': () => {
                
            }, //will be on third line
            'Exit': () => {
                    $.sendMessage(`Adios!`);
            }, //will be on fourth line
        })
    }

    get routes() {
        return {
            'liveCommand': 'liveHandler'
        };
    }
}

module.exports = LiveController;