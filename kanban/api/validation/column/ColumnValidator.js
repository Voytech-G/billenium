const ValidatorAbstract = require('../ValidatorAbstract')

class ColumnValidator extends ValidatorAbstract {
    /**
     * Validate create column request data
     * 
     * @param {Object} request 
     * @return {void}
     */
    static validateCreateRequest(request) {
        try {
            if (request.project_id == null) {
                throw new Error('Project ID is required')
            }
    
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
        } catch (exception) {
            throw new Error(`Create column request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate update column request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        try {
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
        } catch (exception) {
            throw new Error(`Update column request validation failed: ${exception.message}`)
        }
    }

    /**
     * Check if given column ID is valid mongoose object ID
     * 
     * @param {string} columnId
     * @return {void}
     */
    static checkColumnObjectIDValid(columnId) {
        try {
            this.checkObjectIDValid(columnId, 'column')
    
            return
        } catch (exception) {
            throw new Error(`Column object ID validation failed: ${exception.message}`)
        }
    }
       
    /**
     * Validate remove request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        try {
            if (payload.column_id == null) {
                throw new Error('Column ID is required')
            } 
            
            return
        } catch (exception) {
            throw new Error(`Column remove request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate get one request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        try {
            this.checkColumnObjectIDValid(payload.column_id)
    
            return
        } catch (exception) {
            throw new Error(`Get one column request validation failed: ${exception.message}`)
        }
    }
}

module.exports = ColumnValidator