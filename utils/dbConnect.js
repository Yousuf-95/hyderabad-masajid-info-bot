const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
    }
}

async function disconnectFromDB() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectToDB, disconnectFromDB };