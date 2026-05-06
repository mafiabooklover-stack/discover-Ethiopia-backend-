const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    region: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    bestTime: { type: String, required: true },
    importance: { type: String, required: true },
    category: {
        type: String,
        enum: ['historical', 'natural', 'cultural'],
        required: true
    },
    // Coordinates for map
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    // Extra details
    highlights: [String],
    entryFee: { type: String, default: 'Varies' },
    duration: { type: String, default: '1-2 days' }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);
