'use strict';

const Telegram = require('telegram-node-bot');

class AboutController extends Telegram.TelegramBaseController {

    /**
     * @param {Scope} $
     */
    aboutHandler($) {
        $.sendMessage("Greetings Earthling! Football Ultra Bot is at your service." +
            "\nUse the following commands:" +
            "\n- /live : live scores from the league you select" +
            "\n- /fixtures : list of fixtures from the current matchday" +
            "\n- /standings : League table" +
            "\n- /scorers : Top 10 goal scoreres in the league");
    }

    get routes() {
        return {
            'aboutCommand': 'aboutHandler'
        };
    }
}

module.exports = AboutController;