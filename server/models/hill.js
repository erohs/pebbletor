const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    id: String,
    name: String,
    percentage: Number,
    isNewPercentage: Boolean,
    currentPos: [Number],
    colour: String,
    status: String
})

const hillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    markers: {
        type: [markerSchema],
        required: true
    }
}, { timestamps: true });

const Hill = mongoose.model('Hill', hillSchema);
module.exports = Hill;