const TaskValidator = require('../validation/task/TaskValidator')
const ColumnService = require('../service/ColumnService')
const TaskRepository = require('../database/repository/TaskRepository')

class TaskService {
    /**
     * Create a new task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createTask(payload) {
        const content = payload.content
        const rowIndex = payload.row_index
        const columnId = payload.column_id

        const task = await TaskRepository.create(content, rowIndex, columnId)

        const taskId = task.id
        await ColumnService.assignTaskToColumn(columnId, taskId)

        return task
    }

    /**
     * Move task from one position to another position (row index, column),
     * unassign the task from the column it was previously in, assign it to the new column
     * 
     * @param {Object} payload 
     * @return {Object}
     */
    static async moveTask(payload) {
        const taskId = payload.task_id
            
        const targetRowIndex = payload.target_row_index
        const targetColumnId = payload.target_column_id
        
        const sourceRowIndex = payload.source_row_index
        const sourceColumnId = payload.source_column_id

        // in case target column is not the same as source column we switch them
        if (targetColumnId !== sourceColumnId) {
            await ColumnService.unassignTaskFromColumn(taskId)
            await ColumnService.assignTaskToColumn(targetColumnId, taskId)
        }

        // adjust all tasks in target and source columns (move tasks above in source column task down, move tasks above in target column up)
        await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)
        await this.moveTasksAboveRowIndexUp(targetRowIndex, targetColumnId, true)

        // update the moved task (its position)
        const filter = { 
            _id: taskId,
        }

        const update = { 
            row_index: targetRowIndex,
            column: targetColumnId,
        }

        // update moved task's position to target task position
        return await TaskRepository.findOneByFilterAndUpdate(filter, update)
    }

     /**
     * Move all tasks above row index down (select if includes given row index's task)
     * 
     * @param {Number} sourceRowIndex 
     * @param {String} sourceColumnId 
     * @param {Boolean} including 
     * @return {void}
     */
    static async moveTasksAboveRowIndexDown(rowIndex, columnId, including = false) {
        const update = {
            $inc: { row_index: -1 },
        }

        await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, including)

        return
    }

    /**
     * Move all tasks above given row index up (select if includes given row index's task)
     * 
     * @param {Number} targetRowIndex 
     * @param {String} targetColumnId 
     * @param {Boolean} including
     * @return {void}
     */
    static async moveTasksAboveRowIndexUp(rowIndex, columnId, including = false) {
        const update = {
            $inc: { row_index: 1 },
        }

        await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, including)

        return
    }

    /**
     * Change row_indexes of task in given column (move them above certain row_index up or down depending on given update object)  
     * 
     * @param {Object} update
     * @param {Number} rowIndex 
     * @param {Number} columnId 
     * @param {Boolean} including 
     * @return {void}
     */
    static async changeColumnTasksRowIndexes(update, rowIndex, columnId, including = false) {
        const filter = {
            column: columnId,
        }

        filter.row_index = including === true ? { $gte: rowIndex } : { $gt: rowIndex }

        return await TaskRepository.findManyByFilterAndUpdate(filter, update)
    }

    /**
     * Update task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateTask(payload) {
        const taskId = payload.task_id
        const content = payload.content

        const filter = {
            _id: taskId,
        }

        const update = { 
            content, 
        }

        return await TaskRepository.findOneByFilterAndUpdate(filter, update)
    }

    /**
     * Remove one task, unassign it from column it was in
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeTask(payload) {
        const taskId = payload.task_id
        const sourceRowIndex = payload.source_row_index
        const sourceColumnId = payload.source_column_id

        await ColumnService.unassignTaskFromColumn(taskId)

        // after we remove the task we move all tasks above it to fill the created gap
        await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)

        return await TaskRepository.findByIdAndRemove(taskId)
    }

    /**
     * Get one task by task ID
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOne(payload) {
        const taskId = payload.task_id

        return await TaskRepository.findByIdAndPopulate(taskId, ['column'])
    }
}

module.exports = TaskService