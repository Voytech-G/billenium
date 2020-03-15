const Note = require('../database/model/Note') 
const NoteValidator = require('../validation/note/NoteValidator')
const NoteRepository = require('../database/repository/NoteRepository')

class NoteController {
    /**
     * Create a new note
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return void
     */
    static async create(payload, callback) {
        try {
            NoteValidator.validateCreateRequest(payload)

            const content = payload.content
            const rowIndex = payload.row_index
            const columnId = payload.column_id

            let note = await NoteRepository.create(content, rowIndex, columnId)

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
        try {
            NoteValidator.validateUpdateRequest(payload)

            const noteId = payload.note_id
            const content = payload.content
            const rowIndex = payload.row_index
            const columnId = payload.column_id

            const filter = { 
                _id: noteId 
            }
            
            const update = { 
                content, 
                row_index: rowIndex, 
                column_id: columnId
            }

            let note = await NoteRepository.findOneAndUpdate(filter, update)

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
        try {
            NoteValidator.validateDeleteRequest(payload)

            const noteId = payload.note_id
            const filter = { _id: noteId }

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