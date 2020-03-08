const Note = require('../../database/models/Note')
const validateUpdateNote = require('../../validation/note/request/update')
const validateUpdateNoteResponse = require('../../validation/note/response/updateResponse')

module.exports = async (payload, callback) => {
    const noteId = payload.note_id
    const content = payload.content
    const rowIndex = payload.row_index
    const columnId = payload.column_id

    try {
        validateUpdateNote(noteId, content, rowIndex, columnId)

        const filter = { 
            _id: noteId 
        }
        
        const update = { 
            content, 
            row_index: rowIndex, 
            column_id: columnId
        }

        let note = await Note.findOneAndUpdate(filter, update, {
            new: true,
            useFindAndModify: true,
        })

        validateUpdateNoteResponse(note)

        callback({
            status: true,
            message: 'Successfully updated the note',
            payload: note,
        })

        return
    } catch (exception) {
        console.error(exception.message)

        callback({
            status: false,
            message: `Failed to update the note: ${exception.message}`
        })

        return
    }
}