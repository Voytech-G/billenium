const Note = require('../../database/models/Note')
const validateDeleteNote = require('../../validation/note/request/delete')
const validateDeleteNoteResponse = require('../../validation/note/response/deleteResponse')

module.exports = async(payload, callback) => {
    const noteId = payload.note_id
    const filter = { _id: noteId }

    try {
        validateDeleteNote(noteId)

        let response = await Note.deleteOne(filter)

        validateDeleteNoteResponse(response)

        callback({
            status: true,
            message: `Successfully deleted note of id: ${noteId}`
        })

        return
    } catch (exception) {
        callback({
            status: false,
            message: `Failed to delete note: ${exception.message}`
        })

        return
    }
}