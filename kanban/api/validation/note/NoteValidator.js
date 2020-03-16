const noteConfig = require("../../config/note");

class NoteValidator {
    /**
     * Validate create new note request data
     * 
     * @param {Object} payload
     * @return void
     */
    static validateCreateRequest(payload) {
        if (payload.content == null) {
            throw new Error(`Note content is required`)
        }
    
        if (payload.row_index == null) {
            throw new Error(`Row index is required`)
        }
    
        if (payload.column_id == null) {
            throw new Error(`Column ID is required`)
        }

        return
    }

    /**
     * Validate update note request data
     * 
     * @param {Object} payload 
     * @return void
     */
    static validateUpdateRequest(payload) {
        if (payload.note_id == null) {
            throw new Error(`Note ID is required`)
        }
        
        if (payload.content == null) {
            throw new Error(`Note content is required`)
        }

        return
    }

    /**
     * Validate request data needed to swap notes with each other
     * 
     * @param {Object} payload
     * @return {Boolean}
     */
    static validateSwapNotesRequest(payload) {
        if (payload.note_id == null) {
            return 'Note ID is required to swap notes'
        }

        if (payload.target_row_index == null) {
            return 'Target row index is required to swap notes'
        }

        if (payload.target_column_id == null) {
            return 'Target column ID is required to swap notes'
        }

        if (payload.source_row_index == null) {
            return 'Source row index is required to swap notes'
        }

        if (payload.source_column_id == null) {
            return 'Source column ID is required to swap notes'
        }

        return
    }

    /**
     * Validate delete note request data
     * 
     * @param {Object} payload 
     * @return void
     */
    static validateDeleteRequest(payload) {
        if (payload.note_id == null) {
            throw new Error("Note ID is required");
        }
        
        if (payload.note_id.length !== noteConfig.ID_LENGTH) {
            throw new Error("Note ID is invalid");
        }

        return
    }

    /**
     * Validate create new note response data
     * 
     * @param {String} response 
     * @return void
     */
    static validateCreateResponse(response) {
        if (response == null) {
            throw new Error('It seems like the note has not been created')
        }
    
        if (!(response instanceof Object)) {
            throw new Error('Invalid response')
        }

        return
    }

    /**
     * Validate update note response data
     * 
     * @param {String} response 
     * @return void
     */
    static validateUpdateResponse(response) {
        if (response == null) {
            throw new Error('No notes updated')
        }

        return
    }

    /**
     * Validate delete note response data
     * 
     * @param {Object} response 
     * @return void
     */
    static validateDeleteResponse(response) {
        // check if number of deleted notes is exactly one
        if (response.deletedCount !== 1) {
            throw new Error('Found no notes of given ID')
        }

        return
    }

    /**
     * Validate get all notes response data
     * 
     * @param {Array} response 
     * @return void
     */
    static validateGetAllResponse(response) {
        if (!Array.isArray(response)) {
            throw new Error('Invalid response')
        }

        return
    }
}

module.exports = NoteValidator