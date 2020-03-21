const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')
const TaskService = require('../service/TaskService')

class TaskController {
    /**
     * Create a new task
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return void
     */
    static async create(payload, callback) {
        try {
            const task = await TaskService.createTask(payload)

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
     * @return void 
     */
    static async move(payload, callback) {
        try {
            TaskValidator.validateMoveRequest(payload)

            const taskId = payload.task_id
            
            const targetRowIndex = payload.target_row_index
            const targetColumnId = payload.target_column_id
            
            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id

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
     * Update a task
     * 
     * @param {Object} payload 
     * @param {Function} callback 
     * @return void
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
     * @return void
     */
    static async delete(payload, callback) {
        try {
            TaskValidator.validateDeleteRequest(payload)

            const taskId = payload.task_id
            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id

            // after weww delete the task we move all tasks above it to fill the created gap
            await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)

            const filter = { _id: taskId }

            let response = await TaskRepository.deleteOneByFilter(filter)

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