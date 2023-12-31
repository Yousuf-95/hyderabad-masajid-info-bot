const mongoose = require('mongoose');

const PrayerTimingSchema = new mongoose.Schema({
    fajr: String,
    zuhr: String,
    asr: String,
    maghrib: String,
    isha: String,
}, { _id: false });


const MasajidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    area: String,
    timing: PrayerTimingSchema,
}, { timestamps: true })

module.exports = mongoose.model('masajids', MasajidSchema);