'use strict';

const Telegram = require("telegram-node-bot");
const DAO = require("./dao");
class FixturesController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    fixturesHandler($) {

        // $.runInlineMenu({
        //     layout: 2, //some layouting here
        //     method: 'sendMessage', //here you must pass the method name
        //     params: ['text'], //here you must pass the parameters for that method
        //     menu: [{
        //             text: '1', //text of the button
        //             callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
        //                 console.log(1);
        //                 console.log(message);
        //             }
        //         },
        //         {
        //             text: 'Exit',
        //             message: 'Are you sure?',
        //             layout: 2,
        //             menu: [ //Sub menu (current message will be edited)
        //                 {
        //                     text: 'Yes!',
        //                     callback: (callbackQuery, message) => {
        //                         $.api.editMessageText('new text', {
        //                             chat_id: $.chatId,
        //                             message_id: message.messageId
        //                         })
        //                     }
        //                 },
        //                 {
        //                     text: 'No!',
        //                     callback: () => {

        //                     }
        //                 }
        //             ]
        //         }
        //     ]
        // })





        $.runInlineMenu({
            layout: 2,
            method: 'sendMessage',
            params: ['Select a competition'],
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
                    callback: (callbackQuery, message) => {
                        DAO.readScheduledMatches('PL', function (data) {
                            $.api.editMessageText('- English Premier League -\n\n' + data, {
                                chat_id: $.chatId,
                                message_id: message.messageId
                            });
                        });
                    }
                },
                {
                    text: 'Champions League',
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
                    callback: (callbackQuery, message) => {
                        $.api.editMessageText('Hasta la vista, baby!', {
                            chat_id: $.chatId,
                            message_id: message.messageId
                        })
                    }
                }
            ]
        })
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