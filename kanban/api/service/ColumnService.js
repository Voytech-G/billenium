const ColumnRepository = require('../database/repository/ColumnRepository')
const TaskRepository = require('../database/repository/TaskRepository')
const ProjectService = require('../service/ProjectService')

class ColumnService {
    /**
     * Create column
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createColumn(payload) {
        try {
            const projectId = payload.project_id
            const name = payload.name
            const boardIndex = payload.board_index
            const maxTasks = payload.max_tasks
    
            // get column ID to add reference to it to target project
            const createdColumn = await ColumnRepository.create(projectId, name, boardIndex, maxTasks)

            if (createdColumn == null) {
                throw new Error('An error occured, no column created.')
            }
            
            const columnId = createdColumn.id
            await ProjectService.assignColumnToProject(columnId, projectId)
            
            return createdColumn
        } catch (exception) {
            throw new Error(`Failed to create a column: ${exception.message}`)
        }
    }

    /**
     * Update column
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateColumn(payload) {
        try {
            const columnId = payload.column_id
            const name = payload.name
            const boardIndex = payload.board_index
            const maxTasks = payload.max_tasks
    
            const update = {
                name: name,
                board_index: boardIndex,
                max_tasks: maxTasks,
            }

            const column = await ColumnRepository.findById(columnId)

            if (column == null) {
                throw new Error('Found no column of given ID.')
            }

            const updatedColumn = await ColumnRepository.update(column, update)

            if (updatedColumn == null) {
                throw new Error('An error occured, no columns updated.')
            }

            return updatedColumn
        } catch (exception) {
            throw new Error(`Failed to update a column: ${exception.message}`)
        }
    }

    /**
     * Find the target column for task and assign the task to it
     * 
     * @param {string} columnId
     * @param {Object} taskId
     * @return {void}
     */
    static async assignTaskToColumn(columnId, taskId) {
        try {
            const targetColumn = await ColumnRepository.findById(columnId)
            
            if (targetColumn == null) {
                throw new Error('Found no column to assign the task to.')
            }
            
            // find the task we want to assign to column
            const targetTask = await TaskRepository.findById(taskId)
    
            if (targetTask == null) {
                throw new Error('Found no task to assign to the column.')
            }
    
            // add task to target column tasks collection
            targetColumn.tasks.push(targetTask)
    
            await targetColumn.save()
    
            return
        } catch (exception) {
            throw new Error(`Failed to assign task to column: ${exception.message}`)
        }
    }

    /**
     * Find target column and remove the task from it
     * 
     * @param {string} taskId
     * @return {void} 
     */
    static async unassignTaskFromColumn(columnId, taskId) {
        try {
            const column = await ColumnRepository.findById(columnId)

            if (column == null) {
                throw new Error('Found no column of given ID.')
            }

            column.tasks.pull(taskId)

            await column.save()
        } catch (exception) {
            throw new Error(`Failed to unassign the task from column: ${exception.message}`)
        }
    }

    /**
     * Remove one column by ID
     * 
     * @param {Object} payload
     * @return {Object} // data about the removed column 
     */
    static async removeColumn(payload) {
        try {
            const columnId = payload.column_id
            const column = await ColumnRepository.findById(columnId)

            if (column == null) {
                throw new Error('Found no column of given ID.')
            }

            const removedColumn = await ColumnRepository.remove(column)

            if (removedColumn == null) {
                throw new Error('An error occured, no columns removed.')
            }
            
            const projectId = column.project
            await ProjectService.unassignColumnFromProject(columnId, projectId)
        
            // move all columns on the right from removed column to the left so the gap is filled
            const boardIndex = column.board_index
            await this.moveNextColumnsLeft(boardIndex)
        
            return column
        } catch (exception) {
            throw new Error(`Failed to remove the column: ${exception.message}`)
        }
    }

    /**
     * Move all columns to the right of given board index to the left
     * 
     * @param {Number} boardIndex
     * @return {void} 
     */
    static async moveNextColumnsLeft(boardIndex) {
        try {
            const update = {
                $inc: { board_index: -1 }
            }
    
            await this.changeColumnsBoardIndexes(update, boardIndex)
            
            return
        } catch (exception) {
            throw new Error(`Failed to move next columns to the left: ${exception.message}`)
        }
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
        try {
            const filter = {
                board_index: including === true ? { $gte: boardIndex } : { $gt: boardIndex }
            }
    
            await ColumnRepository.findManyByFilterAndUpdate(filter, update)
    
            return
        } catch (exception) {
            throw new Error(`Failed to change columns board indexes: ${exception.message}`)
        }
    }

    /**
     * Get one column data
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOne(payload) {
        try {
            const columnId = payload.column_id
            const column = await ColumnRepository.findById(columnId)

            if (column == null) {
                throw new Error('Found no column of given ID.')
            }

            const populateConfig = [
                {
                    path: 'tasks',
                    model: 'Task',
                    // populate: {
                    //     path: 'subtasks',
                    //     model: 'Subtask',
                    // },
                }
            ]

            return await ColumnRepository.populate(column, populateConfig)
        } catch (exception) {
            throw new Error(`Failed to get one column: ${exception.message}.`)
        }
    }
}

module.exports = ColumnService