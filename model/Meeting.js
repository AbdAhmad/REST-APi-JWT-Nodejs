const mongoose = require('mongoose');
const meetingSchema = new mongoose.Schema({
    meeting_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    organiser: {
        type: String,
        required: true
    },
    attendees: [String]
}, { timestamps: true} );

module.exports = mongoose.model('Meeting', meetingSchema);
