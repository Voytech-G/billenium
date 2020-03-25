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

        // adjust all tasks in the same column
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
        let updatedTask = await TaskRepository.findOneByFilterAndUpdate(filter, update)

        TaskValidator.validateUpdateResponse(updatedTask)

        return updatedTask
    }

     /**
     * Move all tasks above row index down (select if includes given row index's task)
     * 
     * @param {Number} sourceRowIndex 
     * @param {String} sourceColumnId 
     * @param {Boolean} including 
     */
    static async moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId, including = false) {
        let filter = {
            row_index: { $gt: sourceRowIndex },
            column: sourceColumnId,
        }

        // if including flag is true update also the task at given row index, else only the ones above
        filter.row_index = including === true ? { $gte: sourceRowIndex } : { $gt: sourceRowIndex }

        const update = {
            $inc: { row_index: -1 },
        }

        let response = await TaskRepository.findManyByFilterAndUpdate(filter, update)

        TaskValidator.validateMoveResponse(response)

        return
    }

    /**
     * Move all tasks above given row index up (select if includes given row index's task)
     * 
     * @param {Number} targetRowIndex 
     * @param {String} targetColumnId 
     * @param {Boolean} including 
     */
    static async moveTasksAboveRowIndexUp(targetRowIndex, targetColumnId, including = false) {
        let filter = {
            column: targetColumnId,
        }

        // if including flag is true update also the task at given row index, else only the ones above
        filter.row_index = including === true ? { $gte: targetRowIndex } : { $gt: targetRowIndex }

        const update = {
            $inc: { row_index: 1 },
        }

        let response = await TaskRepository.findManyByFilterAndUpdate(filter, update)

        TaskValidator.validateMoveResponse(response)

        return
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
     * Delete one task, unassign it from column it was in
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async deleteTask(payload) {
        const taskId = payload.task_id
        const sourceRowIndex = payload.source_row_index
        const sourceColumnId = payload.source_column_id

        await ColumnService.unassignTaskFromColumn(taskId)

        // after we delete the task we move all tasks above it to fill the created gap
        await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)

        const filter = { _id: taskId }

        return await TaskRepository.deleteOneByFilter(filter)
    }
}

module.exports = TaskService