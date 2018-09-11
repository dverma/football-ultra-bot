'use strict';

const Telegram = require('telegram-node-bot');

class AboutController extends Telegram.TelegramBaseController{

    /**
     * @param {Scope} $
     */
    aboutHandler($) {
        $.sendMessage('⚽️ Welcome to the fantastic world of football ⚽ ️');
    }

    get routes() {
        return {
            'aboutCommand': 'aboutHandler'
        };
    }
}

module.exports = AboutController;