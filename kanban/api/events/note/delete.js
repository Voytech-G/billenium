const Note = require('../../database/models/Note.js')
const validateRemovedNote = require('../../validation/note/delete.js')

module.exports = async(payload, callback) => {
    const noteId = payload.note_id
    const filter = { _id: noteId }

    try {
        let response = await Note.deleteOne(filter)

        validateRemovedNote(response)

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