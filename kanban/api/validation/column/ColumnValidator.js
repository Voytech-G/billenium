const ValidatorAbstract = require('../ValidatorAbstract')

class ColumnValidator extends ValidatorAbstract {
    /**
     * Validate create column request data
     * 
     * @param {Object} request 
     * @return {void}
     */
    static validateCreateRequest(request) {
        if (request.name == null) {
            throw new Error('Column name is required')
        }

        if (request.board_index == null) {
            throw new Error('Column board index is required')
        }

        if (typeof request.board_index != 'number') {
            throw new Error('Column board index has to be a number')
        }

        if (request.max_tasks == null) {
            throw new Error('Column max tasks number is required')
        }

        return
    }

    /**
     * Validate create column response data
     * 
     * @param {Object} column 
     * @return {void}
     */
    static validateCreateResponse(column) {
        if (typeof column != 'object') {
            throw new Error('Create column error occured')
        }

        return
    }

    /**
     * Validate update column request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        if (payload.column_id == null) {
            throw new Error('Column ID is required')
        }

        if (payload.name == null) {
            throw new Error('Column name is required')
        }

        if (payload.board_index == null) {
            throw new Error('Column board index is required')
        }

        if (payload.max_tasks == null) {
            throw new Error('Column max tasks number is required')
        }

        return
    }

    /**
     * Validate update column response data
     * 
     * @param {Object} response 
     * @return {void}
     */
    static validateUpdateResponse(response) {
        if (response == null) {
            throw new Error('Invalid update response')
        }

        if (!(response instanceof Object)) {
            throw new Error('Invalid update response')
        }

        return
    }
    
    /**
     * Validate get all columns response data
     * 
     * @param {Array} response 
     * @return {void}
     */
    static validateGetAllResponse(response) {
        // check if response is not array
        if (!Array.isArray(response)) {
            throw new Error('Invalid response')
        }

        return
    }

    /**
     * Validate find one column by id response data
     * 
     * @param {Object} response
     * @return {void} 
     */
    static validateFindByIdResponse(response) {
        if (response == null) {
            throw new Error('Failed assigning created task to the selected column')
        }

        if (response.length > 1) {
            throw new Error('Found more than 1 column of this ID')
        }

        return
    }

    /**
     * Check if given column ID is valid mongoose object ID
     * 
     * @param {string} columnId
     * @return {void}
     */
    static checkColumnObjectIDValid(columnId) {
        this.checkObjectIDValid(columnId, 'column')

        return
    }
}

module.exports = ColumnValidator