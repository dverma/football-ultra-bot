'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController{

    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Sorry, I do not understand.');
    }
}

module.exports = OtherwiseController;