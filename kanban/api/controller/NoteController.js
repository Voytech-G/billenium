const mongoose = require('mongoose')
const Note = require('../database/model/Note')
const NoteValidator = require('../validation/note/NoteValidator')

class NoteController {
    /**
     * Create a new note
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return void
     */
    static async create(payload, callback) {
        const content = payload.content
        const rowIndex = payload.row_index
        const columnId = payload.column_id

        try {
            NoteValidator.validateCreateRequest(payload)

            const newNote = new Note({
                _id: new mongoose.Types.ObjectId(),
                content,
                row_index: rowIndex,
                column_id: columnId,
            })

            let note = await newNote.save()

            NoteValidator.validateCreateResponse(note)

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

    /**
     * Update a note
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return void
     */
    static async update(payload, callback) {
        const noteId = payload.note_id
        const content = payload.content
        const rowIndex = payload.row_index
        const columnId = payload.column_id

        try {
            NoteValidator.validateUpdateRequest(payload)

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

            NoteValidator.validateUpdateResponse(note)

            callback({
                status: true,
                message: 'Successfully updated the note',
                payload: note,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to update the note: ${exception.message}`
            })

            return
        }
    }

    /**
     * Delete a note
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return void
     */
    static async delete(payload, callback) {
        const noteId = payload.note_id
        console.log(noteId)
        const filter = { _id: noteId }

        try {
            NoteValidator.validateDeleteRequest(noteId)

            let response = await Note.deleteOne(filter)

            NoteValidator.validateDeleteResponse(response)

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
}

module.exports = NoteController