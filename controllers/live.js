'use strict';

const Telegram = require("telegram-node-bot");
const DAO = require("./dao");
class LiveController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    liveHandler($) {
        $.runMenu({
            message: 'Select a competition:',
            layout: [3, 1, 1],
            'Serie A': () => {
                var data = DAO.readLiveMatches('SA');
                $.sendMessage('--- Serie A ---\n' + data);
            },
            'La Liga': () => {
                var data = DAO.readLiveMatches('PD');
                $.sendMessage('--- Serie A ---\n' + data);
            },
            'Premier League': () => {
                var data = DAO.readLiveMatches('PL');
                $.sendMessage('--- Serie A ---\n' + data);
            },
            'UEFA Champions League': () => {
                var data = DAO.readLiveMatches('CL');
                $.sendMessage('--- Serie A ---\n' + data);
            },
            'Exit': () => {
                $.sendMessage('Hasta la vista, baby!');
            }
        })
    }

    get routes() {
        return {
            'liveCommand': 'liveHandler'
        };
    }
}

module.exports = LiveController;