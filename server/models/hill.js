const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    }
}, { timestamps: true });

const Hill = mongoose.model('Hill', hillSchema);
module.exports = Hill;