const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')
const TaskService = require('../service/TaskService')

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

            const movedTask = TaskService.moveTask(payload)

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

            const taskId = payload.task_id
            const content = payload.content

            const filter = {
                _id: taskId,
            }

            const update = { 
                content, 
            }

            let task = await TaskRepository.findOneByFilterAndUpdate(filter, update)

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
     * Delete a task
     * 
     * @param {Object} payload 
     * @param {Function} callback
     * @return {void}
     */
    static async delete(payload, callback) {
        try {
            TaskValidator.validateDeleteRequest(payload)

            TaskService.deleteTask(payload)

            TaskValidator.validateDeleteResponse(response)

            callback({
                status: true,
                message: `Successfully deleted the task`
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `Failed to delete task: ${exception.message}`
            })

            return
        }
    }
}

module.exports = TaskController