const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')
const TaskService = require('../service/TaskService')
const ColumnService = require('../service/ColumnService')

class TaskController {
    /**
     * Create a new task
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async create(payload, callback) {
        try {
            TaskValidator.validateCreateRequest(payload)

            const task = await TaskService.createTask(payload)

            TaskValidator.validateCreateResponse(task)

            callback({
                status: true,
                message: 'Successfully created a new task',
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to create a new task: ${exception.message}`,
            })

            return
        }
    }

    /**
     * Move task to another position, add 1 to row index of all tasks above
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void} 
     */
    static async move(payload, callback) {
        try {
            TaskValidator.validateMoveRequest(payload)

            const movedTask = await TaskService.moveTask(payload)

            TaskValidator.validateUpdateResponse(movedTask)

            callback({
                status: true,
                message: 'Successfully moved the task',
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to move the task: ${exception.message}`
            })

            return
        }
    }

    /**
     * Update a task
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async update(payload, callback) {
        try {
            TaskValidator.validateUpdateRequest(payload)

            const task = TaskService.updateTask(payload)

            TaskValidator.validateUpdateResponse(task)

            callback({
                status: true,
                message: 'Successfully updated the task',
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to update the task: ${exception.message}`
            })

            return
        }
    }

    /**
     * Remove a task
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void}
     */
    static async remove(payload, callback) {
        try {
            TaskValidator.validateRemoveRequest(payload)

            const response = await TaskService.removeTask(payload)

            TaskValidator.validateRemoveResponse(response)

            callback({
                status: true,
                message: `Successfully removed the task`
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to remove task: ${exception.message}`
            })

            return
        }
    }
}

module.exports = TaskController