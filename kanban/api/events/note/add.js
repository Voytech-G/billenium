const mongoose = require('mongoose')
const Note = require('../../database/models/Note')
const validateNewNote = require('../../validation/note/new.js')

module.exports = async(payload, callback) => {
    const content = payload.content
    const rowIndex = payload.row_index
    const columnId = payload.column_id

    try {
        validateNewNote(content, rowIndex, columnId)

        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            content,
            row_index: rowIndex,
            column_id: columnId,
        })

        let note = await newNote.save()
        callback({
            status: true,
            message: 'Successfully created a new note',
            payload: note,
        })

        return
    } catch (exception) {
        callback({
            status: false,
            message: `Failed to create a new note: ${exception.message}`,
        })

        return
    }
}