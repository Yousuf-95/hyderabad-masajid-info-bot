const axios = require('axios');

async function main(event) {
    try {
        const { update_id, message } = JSON.parse(event?.body);
        console.log("Update id: ", update_id);

        const messageText = message.text;
        const chatId = message.chat.id;

        if (messageText.charAt(0) === '/') {
            const command = messageText.substr(1);

            switch (command) {
                case 'start':

                    await axios.get('/sendMessage', {
                        baseURL: process.env.TELEGRAM_BOT_BASE_URL,
                        params: {
                            chat_id: chatId,
                            text: 'Hello from bot'
                        }
                    });
                    return { statusCode: 200 }

                default:

                    await axios.get('/sendMessage', {
                        baseURL: process.env.TELEGRAM_BOT_BASE_URL,
                        params: {
                            chat_id: chatId,
                            text: 'Unknown command'
                        }
                    });
                    return { statusCode: 200 };
            }
        }
        else {
            await axios.get('/sendMessage', {
                baseURL: process.env.TELEGRAM_BOT_BASE_URL,
                params: {
                    chat_id: chatId,
                    text: 'Please enter a command'
                }
            });

            return { statusCode: 200 };
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.handler = main;