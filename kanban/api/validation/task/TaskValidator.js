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
        try {
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
        } catch (exception) {
            throw new Error(`Create task request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate update task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateUpdateRequest(payload) {
        try {
            this.checkTaskObjectIDValid(payload.task_id)
            
            if (payload.content == null) {
                throw new Error('Task content is required')
            }
    
            return
        } catch (exception) {
            throw new Error(`Update task request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate move Task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateMoveRequest(payload) {
        try {
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
        } catch (exception) {
            throw new Error(`Move task request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate remove task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateRemoveRequest(payload) {
        try {
            this.checkTaskObjectIDValid(payload.task_id)
    
            if (payload.source_row_index == null) {
                throw new Error('Task row index is required')
            }
    
            if (payload.source_column_id == null) {
                throw new Error('Task column ID is required')
            }
    
            return
        } catch (exception) {
            throw new Error(`Remove task request validation failed: ${exception.message}`)
        }
    }

    /**
     * Validate get one task request data
     * 
     * @param {Object} payload 
     * @return {void}
     */
    static validateGetOneRequest(payload) {
        try {
            this.checkTaskObjectIDValid(payload.task_id)
    
            return
        } catch (exception) {
            throw new Error(`Get one task request validation failed: ${exception.message}`)
        }
    }

    /**
     * Check if given task ID is valid mongoose object ID
     * 
     * @param {string} taskId 
     * @return {void}
     */
    static checkTaskObjectIDValid(taskId) {
        try {
            this.checkObjectIDValid(taskId, 'task')
    
            return
        } catch (exception) {
            throw new Error(`Checking task object ID failed: ${exception.message}`)
        }
    }
}

module.exports = TaskValidator