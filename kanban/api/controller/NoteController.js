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
     * Move note to another position, add 1 to row index of all notes above
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return void 
     */
    static async move(payload, callback) {
        try {
            NoteValidator.validateMoveRequest(payload)

            const noteId = payload.note_id
            
            const targetRowIndex = payload.target_row_index
            const targetColumnId = payload.target_column_id
            
            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id

            this.moveAllNotesInSourceColumnAboveRowIndexDown(sourceRowIndex, sourceColumnId)

            // this.moveAllNotesInTargetColumnAboveRowIndexUp(targetRowIndex, targetColumnId)
            
    
            // filter = { 
            //     _id: noteId,
            // }
    
            // update = { 
            //     row_index: targetRowIndex,
            //     column_id: targetColumnId,
            // }
    
            // // update moved note's position to target note position
            // let updatedNote = await NoteRepository.findOneByFilterAndUpdate(filter, update)

            // NoteValidator.validateUpdateResponse(updatedNote)

            // callback({
            //     status: true,
            //     message: 'Successfully moved the note',
            // })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to move the note: ${exception.message}`
            })

            return
        }
    }

    static async moveAllNotesInSourceColumnAboveRowIndexDown(sourceRowIndex, sourceColumnId) {
        const filter = {
            row_index: { $gt: sourceRowIndex },
            column_id: { sourceColumnId },
        }

        const update = {
            $inc: { row_index: -1 },
        }

        let response = NoteRepository.findManyByFilterAndUpdate(filter, update)
    
        NoteValidator.validateMoveResponse(response)
    }

    static async moveAllNotesInTargetColumnAboveRowIndexUp(targetRowIndex, targetColumnId) {

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

            const filter = {
                _id: noteId,
            }

            const update = { 
                content, 
            }

            let note = await NoteRepository.findOneByFilterAndUpdate(filter, update)

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