const ValidatorAbstract = require('../ValidatorAbstract')
const ProjectValidator = require('../project/ProjectValidator')

class ColumnValidator extends ValidatorAbstract {
    /**
     * Validate create column request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateCreateRequest(payload) {
        try {
            const projectId = payload.project_id
            ProjectValidator.checkProjectObjectIDValid(projectId)

            const columnName = payload.name
            this.validateColumnName(columnName)

            const boardIndex = payload.board_index
            this.validateBoardIndex(boardIndex)
            
            const maxTasks = payload.max_tasks
            this.validateMaxTasks(maxTasks)            
    
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
            const columnId = payload.column_id
            this.checkColumnObjectIDValid(columnId)

            const columnName = payload.name
            this.validateColumnName(columnName)
    
            const boardIndex = payload.board_index
            this.validateBoardIndex(boardIndex)

            const maxTasks = payload.max_tasks
            this.validateMaxTasks(maxTasks)
    
            return
        } catch (exception) {
            throw new Error(`Update column request validation failed: ${exception.message}`)
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
            const columnId = payload.column_id
            this.checkColumnObjectIDValid(columnId)
            
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
            const columnId = payload.column_id
            this.checkColumnObjectIDValid(columnId)
    
            return
        } catch (exception) {
            throw new Error(`Get one column request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {String} name
     * @return {void} 
     */
    static validateColumnName(name) {
        if (name == null || name == '') {
            throw new Error('Column name is required')
        }

        return
    }

    /**
     * @param {String|Number} maxTasks
     * @return {void} 
     */
    static validateMaxTasks(maxTasks) {
        if (maxTasks == null || maxTasks == '') {
            throw new Error('Max tasks number is required')
        }

        if (isNaN(maxTasks)) {
            throw new Error('Max tasks number is invalid')
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
    }

    /**
     * @param {String|Number} index
     * @return {void} 
     */
    static validateBoardIndex(index) {
        if (index == null || index == '') {
            throw new Error('Board index is required')
        }

        if (isNaN(index)) {
            throw new Error('Board index is invalid')
        }

        return
    }
}

module.exports = ColumnValidator