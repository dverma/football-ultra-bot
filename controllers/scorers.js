'use strict';

const Telegram = require("telegram-node-bot");
const DAO = require("./dao");
class ScorersController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    scorersHandler($) {
        $.runInlineMenu({
            layout: 2,
            method: 'sendMessage',
            params: ['Select a competition'],
            menu: [{
                    text: 'Serie A',
                    callback: (callBackQuery, message) => {
                        DAO.readTopScorers('SA', function (data) {
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
                        DAO.readTopScorers('PD', function (data) {
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
                        DAO.readTopScorers('PL', function (data) {
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
                        DAO.readTopScorers('CL', function (data) {
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
            'scorersCommand': 'scorersHandler'
        };
    }
}

module.exports = ScorersController;