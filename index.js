const handleMessage = require('./utils/telegram');

async function main(event) {
    try {
        const { update_id, message } = JSON.parse(event?.body);
        console.log("Update id: ", update_id);

        await handleMessage(message);
    }
    catch (error) {
        console.log(error);
    }
}

exports.handler = main;