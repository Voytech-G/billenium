const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // uid of note
    content: { type: String, required: true },
    row_index: { type: Number, required: true }, // row in which note is placed in specific column
    column_id: { type: Number, required: true }, // column in which note is placed in project board
});

module.exports = mongoose.model('Note', NoteSchema);