const mongoose = require('mongoose')
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

            const targetRowIndex = payload.target_row_index
            const targetColumnId = payload.target_column_id

            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id

            const update = { 
                content, 
                row_index: rowIndex, 
                column_id: columnId
            }

            // set target note row index to source note row index (swap them)
            this.updateTargetNoteRowIndex(noteId, rowIndex, columnId, sourceIndex)

            let note = await NoteRepository.updateOneByFilter({ _id: noteId }, update)

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

    static async updateTargetNoteRowIndex(noteId, rowIndex, columnId, sourceIndex) {
        // get note that is not the same as source at target row_index and in target column_id
        const filter = {
            $and: [
                { _id: { $ne: noteId }},
                { row_index: rowIndex },
                { column_id: columnId },
            ]
        }

        // change target note row_index to source note row_index
        const update = {
            row_index: sourceIndex,
        }

        // check if there are any notes on row_index we want to move the note
        await NoteRepository.findOneByFilterAndUpdate(filter, update)
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

            let response = await NoteRepository.deleteOneByFilter(filter)

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