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
    
        if (payload.row_index == null) {
            throw new Error(`Note row index is required`)
        }
    
        if (payload.column_id == null) {
            throw new Error(`Column ID is required`)
        }

        return
    }

    /**
     * Validate delete note request data
     * 
     * @param {Object} payload 
     * @return void
     */
    static validateDeleteRequest(noteId) {
        if (noteId == null) {
            throw new Error("Note ID is required");
        }
        
        if (noteId.length !== noteConfig.idLength) {
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