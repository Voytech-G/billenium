const ColumnValidator = require('../validation/column/ColumnValidator')
const ColumnRepository = require('../database/repository/ColumnRepository')
const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')

class ColumnService {
    static async createColumn(payload) {
        const name = payload.name
        const boardIndex = payload.board_index

        const column = await ColumnRepository.create(name, boardIndex)

        return column
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