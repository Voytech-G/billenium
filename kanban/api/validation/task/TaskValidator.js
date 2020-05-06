// const taskConfig = require("../../config/task");
const ColumnValidator = require('../column/ColumnValidator')
const UserValidator = require('../user/UserValidator')
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
            const content = payload.content
            this.validateTaskContent(content)

            const rowIndex = payload.row_index
            this.validateRowIndex(rowIndex)

            const columnId = payload.column_id
            ColumnValidator.checkColumnObjectIDValid(columnId)
    
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
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)

            const taskContent = payload.content
            this.validateTaskContent(taskContent)

            // color ID is optional, only if its not null check if its convertable to number
            const colorId = payload.color_id
            if (colorId != null && isNaN(colorId)) {
                throw new Error('Color ID is invalid')
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
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)
    
            const targetRowIndex = payload.target_row_index
            this.validateRowIndex(targetRowIndex)

            const targetColumnId = payload.target_column_id
            ColumnValidator.checkColumnObjectIDValid(targetColumnId)

            const sourceRowIndex = payload.source_row_index
            this.validateRowIndex(sourceRowIndex)

            const sourceColumnId = payload.source_column_id
            ColumnValidator.checkColumnObjectIDValid(sourceColumnId)
    
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
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)
    
            const sourceRowIndex = payload.source_row_index
            this.validateRowIndex(sourceRowIndex)

            const sourceColumnId = payload.source_column_id
            ColumnValidator.checkColumnObjectIDValid(sourceColumnId)
    
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
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)
    
            return
        } catch (exception) {
            throw new Error(`Get one task request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateAssignUserToTaskRequest(payload) {
        try {
            const userId = payload.user_id
            UserValidator.checkUserObjectIDValid(userId)
            
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)

            return
        } catch (exception) {
            throw new Error(`Assign user to task request validation failed: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static validateUnassignUserFromTaskRequest(payload) {
        try {
            const userId = payload.user_id
            UserValidator.checkUserObjectIDValid(userId)
            
            const taskId = payload.task_id
            this.checkTaskObjectIDValid(taskId)

            return
        } catch (exception) {
            throw new Error(`Assign user to task request validation failed: ${exception.message}`)
        }
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
     * @param {String} content
     * @return {void} 
     */
    static validateTaskContent(content) {
        if (content == null || content == '') {
            throw new Error('Task content is required')
        }

        return
    }

    /**
     * Validate row index used in ordering of tasks in column
     * 
     * @param {String|Number} rowIndex
     * @return {void}
     */
    static validateRowIndex(rowIndex) {
        if (rowIndex == null) {
            throw new Error('Row index is required')
        }

        if (isNaN(rowIndex)) {
            throw new Error('Row index is invalid')
        }

        return
    }
}

module.exports = TaskValidator