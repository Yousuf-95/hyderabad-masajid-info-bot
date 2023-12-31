const handleMessage = require('./utils/telegram');
const { connectToDB } = require('./utils/dbConnect');

let connectedToDB = false;

async function main(event) {
    try {
        const { update_id, message } = JSON.parse(event?.body);
        console.log("Update id: ", update_id);

        // Connect to Database
        if (!connectedToDB) {
            await connectToDB();
            connectedToDB = true;
        }

        // Handle incoming message
        await handleMessage(message);

        return {
            statusCode: 200
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.handler = main;