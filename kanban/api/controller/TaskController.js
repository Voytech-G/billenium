const TaskValidator = require('../validation/task/TaskValidator')
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

            callback({
                status: true,
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
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

            callback({
                status: true,
                payload: movedTask,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
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

            const task = await TaskService.updateTask(payload)

            callback({
                status: true,
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
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

            const task = await TaskService.removeTask(payload)

            callback({
                status: true,
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }

    /**
     * Get data about one task by given task ID
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async getOne(payload, callback) {
        try {
            TaskValidator.validateGetOneRequest(payload)
    
            const task = await TaskService.getOne(payload)

            callback({
                status: true,
                payload: task,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     */
    static async getAll(callback) {
        try {
            const tasks = await TaskService.getAllTasks()

            callback({
                status: true,
                payload: tasks,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `${exception.message}`
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async assignUser(payload, callback) {
        try {
            TaskValidator.validateAssignUserToTaskRequest(payload)

            await TaskService.assignUserToTask(payload)
        
            callback({
                status: true,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }

    /**
     * @param {Object} payload 
     * @param {Function} callback 
     * @return {void}
     */
    static async unassignUser(payload, callback) {
        try {
            TaskValidator.validateUnassignUserFromTaskRequest(payload)

            await TaskService.unassignUserFromTask(payload)
        
            callback({
                status: true,
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: exception.message,
            })

            return
        }
    }
}

module.exports = TaskController