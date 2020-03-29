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
     * Check if given task ID is valid mongoose object ID
     * 
     * @param {string} taskId 
     * @return {void}
     */
    static checkTaskObjectIDValid(taskId) {
        this.checkObjectIDValid(taskId, 'task')

        return
    }
}

module.exports = TaskValidator