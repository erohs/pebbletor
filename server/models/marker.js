const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    hillId: { type: String, required: true },
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    isNewPercentage: { type: Boolean, required: false },
    x: { type: Number, required: false },
    y: { type: Number, required: false },
    colour: { type: String, required: false },
    imagePath: { type: String, required: false },
    status: { type: String, required: true },
}, { timestamps: true });

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;
