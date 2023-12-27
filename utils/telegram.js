const axios = require('axios');
const { commandStartMessage } = require('./replyMessages');

async function sendMessage(messageObj, messageText) {
    try {
        const chatId = messageObj.chat.id;
        const messageId = messageObj.message_id;

        await axios.get(`/sendMessage`, {
            baseURL: process.env.TELEGRAM_BOT_BASE_URL,
            params: {
                chat_id: chatId,
                text: messageText,
                reply_to_message_id: messageId,
                parse_mode: 'MarkdownV2'
            }
        });

    } catch (error) {
        console.log(error);
    }
}


async function handleMessage(messageObj) {
    try {

        const messageText = messageObj.text;
        const chatId = messageObj.chat.id;

        if (messageText.charAt(0) === '/') {
            const command = messageText.substr(1);

            switch (command) {
                case 'start': {

                    await sendMessage(messageObj, commandStartMessage);

                    return { statusCode: 200 };
                }

                default: {
                    await sendMessage(messageObj, 'Unkown command, please try again');

                    return { statusCode: 200 }
                }
            }
        }
        else {
            await sendMessage(messageObj, 'Please enter a command');

            return { statusCode: 200 };
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = handleMessage;