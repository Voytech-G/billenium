const mongoose = require('mongoose')
const Note = require('../../database/models/Note')
const validateCreateNote = require('../../validation/note/create.js')
const validateCreateNoteResponse = require('../../validation/note/createResponse')

module.exports = async(payload, callback) => {
    const content = payload.content
    const rowIndex = payload.row_index
    const columnId = payload.column_id

    try {
        validateCreateNote(content, rowIndex, columnId)

        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            content,
            row_index: rowIndex,
            column_id: columnId,
        })

        let note = await newNote.save()

        validateCreateNoteResponse(note)

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