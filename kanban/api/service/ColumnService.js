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

        const column = await ColumnRepository.findOneByFilterAndUpdate(filter, update)

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

        // add task to target column tasks collection
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

    /**
     * Delete one column by ID
     * 
     * @param {Object} payload
     * @return {Object} // data about the deleted column 
     */
    static async deleteColumn(payload) {
        const columnId = payload.column_id

        await this.removeTasksAssignedToColumn(columnId)

        return await ColumnRepository.findOneByIdAndRemove(columnId)
    }

    /**
     * Remove all tasks that are 
     * 
     * @param {Number} columnId 
     * @return {void}
     */
    static async removeTasksAssignedToColumn(columnId) {
        const filter = {
            column: columnId,
        }
    
        await TaskRepository.findManyByFilterAndRemove(filter)

        return
    }
}

module.exports = ColumnService