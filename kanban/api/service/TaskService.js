const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')

class TaskService {
    /**
     * Create a new task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createTask(payload) {
        TaskValidator.validateCreateRequest(payload)

        const content = payload.content
        const rowIndex = payload.row_index
        const columnId = payload.column_id

        const task = await TaskRepository.create(content, rowIndex, columnId)

        TaskValidator.validateCreateResponse(task)

        return task
    }
}

module.exports = TaskService