'use strict';

const Telegram = require("telegram-node-bot");
const DAO = require("./dao");
class StandingsController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    standingsHandler($) {
        $.runInlineMenu({
            layout: 2,
            method: 'sendMessage',
            params: ['Select a competition'],
            menu: [{
                    text: 'Serie A',
                    callback: (callBackQuery, message) => {
                        DAO.readStandings('SA', function (data) {
                            $.api.editMessageText('- Italian Serie A -\n\n' + data, {
                                chat_id: $.chatId,
                                message_id: message.messageId
                            });
                        });
                    }
                },
                {
                    text: 'La Liga',
                    callback: (callBackQuery, message) => {
                        DAO.readStandings('PD', function (data) {
                            $.api.editMessageText('- Spanish La Liga -\n\n' + data, {
                                chat_id: $.chatId,
                                message_id: message.messageId
                            });
                        });
                    }
                },
                {
                    text: 'Premier League',
                    callback: (callbackQuery, message) => {
                        DAO.readStandings('PL', function (data) {
                            $.api.editMessageText('- English Premier League -\n\n' + data, {
                                chat_id: $.chatId,
                                message_id: message.messageId
                            });
                        });
                    }
                },
                {
                    text: 'Champions League',
                    callback: (callBackQuery, message) => {
                        DAO.readStandings('CL', function (data) {
                            $.api.editMessageText('- UEFA Champions League -\n\n' + data, {
                                chat_id: $.chatId,
                                message_id: message.messageId
                            });
                        });
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
    }

    get routes() {
        return {
            'standingsCommand': 'standingsHandler'
        };
    }
}

module.exports = StandingsController;