const Note = require('../../database/models/Note.js')

module.exports = async (payload, callback) => {
    const noteId = payload.note_id
    const filter = { _id: noteId }

    try {
        await Note.deleteOne(filter)

        callback({
            status: true,
            message: `Successfully deleted note of id: ${noteId}`
        })
    
        return
    } catch (exception) {
        console.error(exception)

        callback({
            status: false,
            message: `Failed to delete note of id: ${noteId}`
        })

        return
    }
}