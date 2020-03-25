const ColumnValidator = require('../validation/column/ColumnValidator')
const ColumnRepository = require('../database/repository/ColumnRepository')
const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')

class ColumnService {
    /**
     * Create column
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createColumn(payload) {
        const name = payload.name
        const boardIndex = payload.board_index
        const maxTasks = payload.max_tasks

        const column = await ColumnRepository.create(name, boardIndex, maxTasks)

        return column
    }

    /**
     * Update column
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateColumn(payload) {
        const columnId = payload.column_id
        const name = payload.name
        const boardIndex = payload.board_index
        const maxTasks = payload.max_tasks

        const filter = {
            _id: columnId,
        }

        const update = {
            name: name,
            board_index: boardIndex,
            max_tasks: maxTasks,
        }

        const response = await ColumnRepository.findByFilterAndUpdate(filter, update)

        return response
    }

    /**
     * Find the target column for task and assign the task to it
     * 
     * @param {string} columnId
     * @param {Object} taskId
     * @return {void}
     */
    static async assignTaskToColumn(columnId, taskId) {
        const targetColumn = await ColumnRepository.findById(columnId)
        
        ColumnValidator.validateFindByIdResponse(targetColumn)
        
        const targetTask = await TaskRepository.findById(taskId)

        TaskValidator.validateFindByIdResponse(targetTask)

        targetColumn.tasks.push(targetTask)

        await targetColumn.save()

        return
    }

    /**
     * Find target column and remove the task from it
     * 
     * @param {string} taskId
     * @return {void} 
     */
    static async unassignTaskFromColumn(taskId) {
        const column = await ColumnRepository.getColumnByTaskId(taskId)
        column.tasks.pull(taskId)

        await column.save()
    }
}

module.exports = ColumnService