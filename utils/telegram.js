const axios = require('axios');
const { commandStartResponse, commandListAreasResponse } = require('./replyMessages');

async function sendMessage(responseParams) {
    try {
        await axios.get(`/sendMessage`, {
            baseURL: process.env.TELEGRAM_BOT_BASE_URL,
            params: responseParams
        });

    } catch (error) {
        console.log(error);
    }
}


async function handleMessage(messageObj) {
    try {

        const chatId = messageObj.chat.id;
        const messageId = messageObj.message_id;
        const messageText = messageObj.text;

        if (messageText.charAt(0) === '/') {
            const command = messageText.substr(1);

            switch (command) {
                case 'start': {

                    const responseParams = {
                        chat_id: chatId,
                        reply_to_message_id: messageId,
                        ...commandStartResponse
                    };

                    await sendMessage(responseParams);

                    return { statusCode: 200 };
                }

                case 'listareas': {

                    const reponseParams = {
                        chat_id: chatId,
                        reply_to_message_id: messageId,
                        ...commandListAreasResponse
                    }

                    await sendMessage(reponseParams);

                    return { statusCode: 200 };
                }

                default: {
                    const responseParams = {
                        chat_id: chatId,
                        reply_to_message_id: messageId,
                        text: 'Unknown command, please try again'
                    }

                    await sendMessage(responseParams);

                    return { statusCode: 200 }
                }
            }
        }
        else {
            const responseParams = {
                chat_id: chatId,
                reply_to_message_id: messageId,
                text: 'Please enter a command'
            }

            await sendMessage(responseParams);

            return { statusCode: 200 };
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = handleMessage;