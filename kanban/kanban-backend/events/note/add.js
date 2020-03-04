const mongoose = require('mongoose')
const Note = require('../../database/models/Note')
const errorMessages = require('../../database/errorMessages')
const successMessages = require('../../database/successMessages')

const validateNewNote = (content, rowIndex, columnIndex) => {
    if (content == null) {
        throw `Failed to create a new note: '${errorMessages.note.MISSING_CONTENT}'`
    }

    if (rowIndex == null) {
        throw `Failed to create a new note: '${errorMessages.note.MISSING_ROW_INDEX}'`
    }

    if (columnIndex == null) {
        throw `Failed to create a new note: '${errorMessages.note.MISSING_COLUMN_INDEX}'`
    }
}

module.exports = payload => {
    const content = payload.content
    const rowIndex = payload.row_index
    const columnIndex = payload.column_index

    try {
        validateNewNote(content, rowIndex, columnIndex)

        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            content: payload.content,
            row_index: payload.row_index,
            column_index: payload.column_index,
        })
    
        newNote.save(error => {
            if (error != null) {
                throw `An error occured while saving the note: ${error}`
            }
    
            console.log(successMessages.note.NEW_SUCCESS)
        })
    } catch (exception) {
        console.error(exception)
    }
}