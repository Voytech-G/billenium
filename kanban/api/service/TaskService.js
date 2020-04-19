const ColumnService = require('../service/ColumnService')
const TaskRepository = require('../database/repository/TaskRepository')
const SubprojectService = require('../service/SubprojectService')
const ColumnRepository = require('../database/repository/ColumnRepository')

class TaskService {
    /**
     * Create a new task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createTask(payload) {
        try {
            const content = payload.content
            const rowIndex = payload.row_index
            const columnId = payload.column_id
    
            const createdTask = await TaskRepository.create(content, rowIndex, columnId)
            if (createdTask == null) {
                throw new Error('An error occured, no tasks created')
            }
    
            const taskId = createdTask.id
            await ColumnService.assignTaskToColumn(columnId, taskId)
    
            return createdTask
        } catch (exception) {
            throw new Error(`Failed to create a task: ${exception.message}`)
        }
    }

    /**
     * Move task from one position to another position (row index, column),
     * unassign the task from the column it was previously in, assign it to the new column
     * 
     * @param {Object} payload 
     * @return {Object}
     */
    static async moveTask(payload) {
        try {
            const taskId = payload.task_id
                
            const targetRowIndex = payload.target_row_index
            const targetColumnId = payload.target_column_id
            
            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id

            // in case target column is not the same as source column we switch them
            if (targetColumnId !== sourceColumnId) {
                await ColumnService.unassignTaskFromColumn(sourceColumnId, taskId)
                await ColumnService.assignTaskToColumn(targetColumnId, taskId)
            }
            
            // adjust all tasks in target and source columns (move tasks above in source column task down, move tasks above in target column up)
            await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)
            await this.moveTasksAboveRowIndexUp(targetRowIndex, targetColumnId, true)

            const update = { 
                row_index: targetRowIndex,
                column: targetColumnId,
            }
            
            const movedTask = await TaskRepository.update(taskId, update)
            if (movedTask == null) {
                throw new Error('An error occured, no tasks moved')
            }
            
            return movedTask
        } catch (exception) {
            throw new Error(`Failed to move the task: ${exception.message}`)
        }
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
        try {
            const column = await ColumnRepository.findById(columnId)
            if (column == null) {
                throw new Error('Found no column of given ID')
            }

            const update = {
                $inc: { row_index: -1 },
            }
    
            await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, including)

            return
        } catch (exception) {
            throw new Error(`Failed to move all tasks above given row index down: ${exception.message}`)
        }
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
        try {
            const column = await ColumnRepository.findById(columnId)
            if (column == null) {
                throw new Error('Found no column of given ID')
            }

            const update = {
                $inc: { row_index: 1 },
            }
    
            await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, including)
    
            return
        } catch (exception) {
            throw new Error(`Failed to move all tasks above given row index up: ${exception.message}`)
        }
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
        try {
            const filter = {
                column: columnId,
            }
    
            filter.row_index = including === true ? { $gte: rowIndex } : { $gt: rowIndex }

            return await TaskRepository.findManyByFilterAndUpdate(filter, update)
        } catch (exception) {
            throw new Error(`Failed to change row indexes of tasks in given column: ${exception.message}`)
        }
    }

    /**
     * Update task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateTask(payload) {
        try {
            const taskId = payload.task_id
            const content = payload.content
    
            const task = await TaskRepository.findById(taskId)
            if (task == null) {
                throw new Error('Found no task of given ID')
            }

            const update = { 
                content, 
            }

            const updatedTask = await TaskRepository.update(taskId, update)
            if (updatedTask == null) {
                throw new Error('An error occured, no tasks updated')
            }

            return updatedTask
        } catch (exception) {
            throw new Error(`Failed to update the task: ${exception.message}`)
        }
    }

    /**
     * Remove one task, unassign it from column it was in
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeTask(payload) {
        try {
            const taskId = payload.task_id
            const sourceRowIndex = payload.source_row_index
            const sourceColumnId = payload.source_column_id
    
            const task = await TaskRepository.findById(taskId)
            if (task == null) {
                throw new Error('Found no task of given ID')
            }
    
            await ColumnService.unassignTaskFromColumn(sourceColumnId, taskId)
    
            // after we remove the task we move all tasks above it to fill the created gap
            await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId)

            // remove reference to this task from its subproject, remove reference to subproject from task
            const subprojectId = task.subproject
            await SubprojectService.unassignTaskFromSubproject(taskId, subprojectId)
    
            const removedTask = await TaskRepository.remove(task)
            if (removedTask == null) {
                throw new Error('An error occured, removed no tasks')
            }
    
            return removedTask
        } catch (exception) {
            throw new Error (`Failed to remove the task: ${exception.message}`)
        }
    }

    /**
     * Get one task by task ID
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOne(payload) {
        try {
            const taskId = payload.task_id
            const task = await TaskRepository.findById(taskId)

            if (task == null) {
                throw new Error('Found no task of given ID')
            }
    
            const populateConfig = [
                {
                    path: 'columns',
                    model: 'Column',
                }
            ]
    
            return await TaskRepository.populate(task, populateConfig)
        } catch (exception) {
            throw new Error(`Failed to get one task: ${exception.message}`)
        }
    }
}

module.exports = TaskService