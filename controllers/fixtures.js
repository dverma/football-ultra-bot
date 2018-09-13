'use strict';

const Telegram = require("telegram-node-bot");
const DAO = require("./dao");
class FixturesController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    fixturesHandler($) {
        $.runInlineMenu({
            layout: 2,
            method: 'sendMessage',
            params: ['option'],
            menu: [{
                    option: 'Serie A',
                    callBack: () => {
                        DAO.readScheduledMatches('SA', function (data) {
                            $.sendMessage('- Italian Serie A -\n' + data);
                        });
                    }
                },
                {
                    option: 'La Liga',
                    callBack: () => {
                        DAO.readScheduledMatches('PD', function (data) {
                            $.sendMessage('- Spanish La Liga -\n' + data);
                        });
                    }
                },
                {
                    option: 'Premier League',
                    callBack: () => {
                        DAO.readScheduledMatches('PL', function (data) {
                            $.sendMessage('- English Premier League -\n' + data);
                        });
                    }
                },
                {
                    option: 'UEFA Champions League',
                    callBack: () => {
                        DAO.readScheduledMatches('CL', function (data) {
                            $.sendMessage('- UEFA Champions League -\n' + data);
                        });
                    }
                },
                {
                    option: 'Exit',
                    callBack: () => {
                        $.sendMessage('Hasta la vista, baby!');
                    }
                }
            ]
        });
        // $.runMenu({
        //     message: 'Select a competition:',
        //     layout: [3, 1, 1],
        //     'Serie A': () => {
        //         DAO.readScheduledMatches('SA', function (data) {
        //             $.sendMessage('- Italian Serie A -\n' + data);
        //         });

        //     },
        //     'La Liga': () => {
        //         DAO.readScheduledMatches('PD', function (data) {
        //             $.sendMessage('- Spanish La Liga -\n' + data);
        //         });
        //     },
        //     'Premier League': () => {
        //         DAO.readScheduledMatches('PL', function (data) {
        //             $.sendMessage('- English Premier League -\n' + data);
        //         });
        //     },
        //     'UEFA Champions League': () => {
        //         DAO.readScheduledMatches('CL', function (data) {
        //             $.sendMessage('- UEFA Champions League -\n' + data);
        //         });
        //     },
        //     'Exit': () => {
        //         $.sendMessage('Hasta la vista, baby!');
        //     }
        // })
    }

    get routes() {
        return {
            'fixturesCommand': 'fixturesHandler'
        };
    }
}

module.exports = FixturesController;