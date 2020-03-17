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

            // check if we are moving the note to another position
            // only if payload contains data about position of updated note we swap them
            if (this.isSwappingNotes(payload)) {
                this.swapNotes(payload)
            }

            const noteId = payload.note_id
            const content = payload.content

            const update = { 
                content, 
            }

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

    /**
     * Check if the client is swapping notes (if target and source position data exist)
     * 
     * @param {Object} payload 
     */
    static async isSwappingNotes(payload) {
        if (payload.target_row_index == null || 
            payload.target_column_id == null || 
            payload.source_row_index == null || 
            payload.source_column_id == null) {
            return false
        }

        return true
    }

    /**
     * Swap target note with source note
     * 
     * @param {Object} payload 
     * @return void
     */
    static async swapNotes(payload) {
        const noteId = payload.note_id
        
        const targetRowIndex = payload.target_row_index
        const targetColumnId = payload.target_column_id
        
        const sourceRowIndex = payload.source_row_index
        const sourceColumnId = payload.source_column_id
        
        // get note that is not the same as source at target row_index and in target column_id
        let filter = {
            $and: [
                { _id: { $ne: noteId }},
                { row_index: targetRowIndex },
                { column_id: targetColumnId },
            ]
        }

        let update = {
            row_index: sourceRowIndex,
            column_id: sourceColumnId,
        }

        // update note at target position, set the position to the moved note's position
        await NoteRepository.findOneByFilterAndUpdate(filter, update)

        filter = { 
            _id: noteId,
        }

        update = { 
            row_index: targetRowIndex,
            column_id: targetColumnId,
        }

        // update moved note's position to target note position
        await NoteRepository.findOneByFilterAndUpdate(filter, update)

        return
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