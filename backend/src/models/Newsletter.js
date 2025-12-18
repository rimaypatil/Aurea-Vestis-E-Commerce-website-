const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please add a valid email'
        ],
        trim: true,
        lowercase: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        default: 'website'
    }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
