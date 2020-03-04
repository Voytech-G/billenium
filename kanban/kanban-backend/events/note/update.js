const mongoose = require('mongoose')
const Note = require('../../database/models/Note.js')
const errorMessages = require('../../database/errorMessages')
const successMessages = require('../../database/successMessages')

const validateUpdateNote = (noteId, content, rowIndex, columnIndex) => {
    if (noteId == null) {
        throw `Failed to update the note: ${errorMessages.note.MISSING_NOTE_ID}`
    }
    
    if (content == null) {
        throw `Failed to update the note: '${errorMessages.note.MISSING_CONTENT}'`
    }

    if (rowIndex == null) {
        throw `Failed to update the note: '${errorMessages.note.MISSING_ROW_INDEX}'`
    }

    if (columnIndex == null) {
        throw `Failed to update the note: '${errorMessages.note.MISSING_COLUMN_INDEX}'`
    }
}

const validateFindNoteResponse = (error, result) => {
    if (error != null) {
        throw `An error occured while looking for the note to update: ${error}`
    }

    if (!Array.isArray(result)) {
        throw `An error occured while looking for the note`
    }

    if (result.length === 0) {
        throw `No notes of given ID found`
    }

    if (result.length > 1) {
        throw `More than 1 note of given ID found`
    }
}

module.exports = async payload => {
    const noteId = payload.note_id
    const content = payload.content
    const rowIndex = payload.row_index
    const columnIndex = payload.column_index

    try {
        validateUpdateNote(noteId, content, rowIndex, columnIndex)

        Note.find({
            _id: noteId, 
        }, 'content row_index column_index', async (error, result) => {
            validateFindNoteResponse(error, result)

            let note = result[0]

            note.content = content
            note.rowIndex = rowIndex
            note.columnIndex = columnIndex

            await note.save()

            console.log(successMessages.note.SUCCESS_UPDATE)
        })

    } catch (exception) {
        console.error(exception)
    }
}