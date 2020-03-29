// const taskConfig = require("../../config/task");
const ValidatorAbstract = require('../ValidatorAbstract')

class TaskValidator extends ValidatorAbstract {
    /**
     * Validate create new task request data
     * 
     * @param {Object} payload
     * @return {void}
     */
    static validateCreateRequest(payload) {
        if (payload.content == null) {
            throw new Error(`Task content is required`)
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
     * Validate update task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        this.checkTaskObjectIDValid(payload.task_id)
        
        if (payload.content == null) {
            throw new Error('Task content is required')
        }

        return
    }

    /**
     * Validate move Task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateMoveRequest(payload) {
        this.checkTaskObjectIDValid(payload.task_id)

        if (payload.target_row_index == null) {
            throw new Error('Task target row index is required')
        }

        if (payload.target_column_id == null) {
            throw new Error('Task target column ID is required')
        }

        if (payload.source_row_index == null) {
            throw new Error('Task source row index is required')
        }

        if (payload.source_column_id == null) {
            throw new Error('Task source column ID is required')
        }

        return
    }

    /**
     * Validate remove task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        this.checkTaskObjectIDValid(payload.task_id)

        if (payload.source_row_index == null) {
            throw new Error('Task row index is required')
        }

        if (payload.source_column_id == null) {
            throw new Error('Task column ID is required')
        }

        return
    }

    /**
     * Validate get one task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        this.checkTaskObjectIDValid(payload.task_id)

        return
    }

    /**
     * Validate create new task response data
     * 
     * @param {String} response 
     * @return {void}
     */
    static validateCreateResponse(response) {
        if (response == null) {
            throw new Error('It seems like the task has not been created')
        }
    
        if (!(response instanceof Object)) {
            throw new Error('Invalid response')
        }

        return
    }

    /**
     * Validate update task response data
     * 
     * @param {String} response 
     * @return {void}
     */
    static validateUpdateResponse(response) {
        if (response == null) {
            throw new Error('No tasks updated')
        }

        return
    }

    /**
     * Validate move task response data
     * 
     * @param {Object} response 
     */
    static validateMoveResponse(response) {
        if (response == null) {
            throw new Error('No tasks moved')
        }

        if (response.ok != 1) {
            throw new Error('Unknown move operation error')
        }

        return
    }

    /**
     * Validate delete task response data
     * 
     * @param {Object} response 
     * @return {void}
     */
    static validateRemoveResponse(response) {
        // check if number of deleted tasks is exactly one
        if (response.deletedCount !== 1) {
            throw new Error('Found no tasks of given ID')
        }

        return
    }

    /**
     * Validate get all tasks response data
     * 
     * @param {Array} response 
     * @return {void}
     */
    static validateGetAllResponse(response) {
        if (!Array.isArray(response)) {
            throw new Error('Invalid response')
        }

        return
    }

    /**
     * Check if given task ID is valid mongoose object ID
     * 
     * @param {string} taskId 
     * @return {void}
     */
    static checkTaskObjectIDValid(taskId) {
        this.checkObjectIDValid(taskId, 'task')

        return
    }

    /**
     * Validate find by ID response data
     * 
     * @param {Object} response 
     * @return {void}
     */
    static validateFindByIdResponse(response) {
        if (response == null) {
            throw new Error('Invalid find by ID response')
        }

        if (response.length > 1) {
            throw new Error('Found more than 1 column of this ID')
        }

        return
    }
}

module.exports = TaskValidator