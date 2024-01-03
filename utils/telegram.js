const axios = require('axios');
const { commandStartResponse, listAreasResponse, selectedAreaResponse, jamaatTimingResponse } = require('./replyMessages');
const MasajidModel = require('../models/masajidInfoModel');

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
            const command = messageText.substring(1);

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

                    const listOfMasajid = await MasajidModel.distinct('area');

                    const commandListAreasResponse = listAreasResponse(listOfMasajid);

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
            let queryResult;

            if (messageText.includes('-')) {
                queryResult = await MasajidModel.findOne({ name: messageText }).lean();

                if (queryResult) {
                    const responseMessage = jamaatTimingResponse(queryResult);

                    const responseParams = {
                        chat_id: chatId,
                        reply_to_message_id: messageId,
                        ...responseMessage
                    }

                    await sendMessage(responseParams);
                }
            }
            else {
                queryResult = await MasajidModel.find({ area: messageText.toLowerCase() }).lean();

                if (queryResult.length) {
                    const responseMessage = selectedAreaResponse(queryResult);

                    const responseParams = {
                        chat_id: chatId,
                        reply_to_message_id: messageId,
                        ...responseMessage
                    }

                    await sendMessage(responseParams);
                }
            }

            if (!queryResult || queryResult?.length === 0) {
                const responseParams = {
                    chat_id: chatId,
                    reply_to_message_id: messageId,
                    text: 'Unknown area or Masjid name'
                }

                await sendMessage(responseParams);
            }

            return { statusCode: 200 };
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = handleMessage;