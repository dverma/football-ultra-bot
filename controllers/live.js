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
                DAO.readLiveMatches('SA', function (data) {
                    $.sendMessage('- Italian Serie A -\n' + data);
                });

            },
            'La Liga': () => {
                DAO.readLiveMatches('PD', function (data) {
                    $.sendMessage('- Spanish La Liga -\n' + data);
                });
            },
            'Premier League': () => {
                DAO.readLiveMatches('PL', function (data) {
                    $.sendMessage('- English Premier League -\n' + data);
                });
            },
            'UEFA Champions League': () => {
                DAO.readLiveMatches('CL', function (data) {
                    $.sendMessage('- UEFA Champions League -\n' + data);
                });
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