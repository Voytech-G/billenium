const mongoose = require('mongoose')

const ColumnSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // uid of note
    name: { type: String, required: true },
    board_index: { type: Number, required: true }, // place in board (from left to right) of the column
});

module.exports = mongoose.model('Column', ColumnSchema);