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
            params: ['text'],
            menu: [{
                    text: 'Serie A',
                    callBack: (callBackQuery, message) => {

                        console.log("\n\n\n-------------");
                        console.log(callBackQuery);
                        console.log("-------------\n\n\n");
                        // DAO.readScheduledMatches('SA', function (data) {
                        //     $.sendMessage('- Italian Serie A -\n' + data);
                        // });
                    }
                },
                {
                    text: 'La Liga',
                    callBack: (callBackQuery, message) => {

                        DAO.readScheduledMatches('PD', function (data) {
                            message('- Spanish La Liga -\n' + data);
                        });
                    }
                },
                {
                    text: 'Premier League',
                    callBack: (callBackQuery, message) => {

                        DAO.readScheduledMatches('PL', function (data) {
                            callBackQuery('- English Premier League -\n' + data);
                        });
                    }
                },
                {
                    text: 'UEFA Champions League',
                    callBack: (callBackQuery, message) => {
                        console.log("\n\n\n-------------");
                        console.log(message);
                        console.log("-------------\n\n\n");
                        // DAO.readScheduledMatches('CL', function (data) {
                        //     $.sendMessage('- UEFA Champions League -\n' + data);
                        // });
                    }
                },
                {
                    text: 'Exit',
                    message: 'Hasta la vista, baby!'
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