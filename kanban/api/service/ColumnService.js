const ColumnValidator = require('../validation/column/ColumnValidator')
const ColumnRepository = require('../database/repository/ColumnRepository')
const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')
const columnConfig = require('../config/column')

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
     * Remove one column by ID
     * 
     * @param {Object} payload
     * @return {Object} // data about the removed column 
     */
    static async removeColumn(payload) {
        const columnId = payload.column_id

        // check if we want to remove tasks assigned to column when column is deleted
        if (columnConfig.REMOVE_TASKS_ON_COLUMN_DELETE) {
            await this.removeTasksAssignedToColumn(columnId)
        }
    
        const column = await ColumnRepository.findOneByIdAndRemove(columnId)
        
        // move all columns on the right from removed column to the left so the gap is filled
        const boardIndex = column.board_index
        await this.moveNextColumnsLeft(boardIndex)

        return column
    }

    /**
     * Move all columns to the right of given board index to the left
     * 
     * @param {Number} boardIndex
     * @return {void} 
     */
    static async moveNextColumnsLeft(boardIndex) {
        const update = {
            $inc: { board_index: -1 }
        }

        await this.changeColumnsBoardIndexes(update, boardIndex)
        
        return
    }

    /**
     * Change all columns board indexes to the right of the given board index with given filter
     * 
     * @param {Object} update 
     * @param {Number} boardIndex 
     * @param {Boolean} including
     * @return {void} 
     */
    static async changeColumnsBoardIndexes(update, boardIndex, including = false) {
        const filter = {
            board_index: including === true ? { $gte: boardIndex } : { $gt: boardIndex }
        }

        await ColumnRepository.findManyByFilterAndUpdate(filter, update)

        return
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

    /**
     * Get one column data
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOne(payload) {
        const columnId = payload.column_id
        
        return await ColumnRepository.findByIdAndPopulate(columnId, 'tasks')
    }
}

module.exports = ColumnService