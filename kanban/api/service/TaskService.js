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

        await ColumnService.unassignTaskFromColumn(taskId)
        await ColumnService.assignTaskToColumn(targetColumnId, taskId)

        await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)
        await this.moveTasksAboveRowIndexUp(targetRowIndex, targetColumnId, true)

        const filter = { 
            _id: taskId,
        }

        const update = { 
            row_index: targetRowIndex,
            column_id: targetColumnId,
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
            column_id: sourceColumnId,
        }

        // if including flag is true update also the task at given row index, else only the ones above
        filter.row_index = including == true ? { $gte: sourceRowIndex } : { $gt: sourceRowIndex }

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
            column_id: targetColumnId,
        }

        // if including flag is true update also the task at given row index, else only the ones above
        filter.row_index = including == true ? { $gte: targetRowIndex } : { $gt: targetRowIndex }

        const update = {
            $inc: { row_index: 1 },
        }

        let response = await TaskRepository.findManyByFilterAndUpdate(filter, update)

        TaskValidator.validateMoveResponse(response)

        return
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

        ColumnService.unassignTaskFromColumn(taskId)

        // after weww delete the task we move all tasks above it to fill the created gap
        await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)

        const filter = { _id: taskId }

        return await TaskRepository.deleteOneByFilter(filter)
    }
}

module.exports = TaskService