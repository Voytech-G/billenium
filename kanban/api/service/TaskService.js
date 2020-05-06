const ColumnService = require('../service/ColumnService')
const TaskRepository = require('../database/repository/TaskRepository')
const UserRepository = require('../database/repository/UserRepository')
const SubprojectService = require('../service/SubprojectService')
const ColumnRepository = require('../database/repository/ColumnRepository')
const TransactionHandler = require('../database/transaction/TransactionHandler')

class TaskService {
    /**
     * Create a new task
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createTask(payload) {
        try {
            const createdTask = await TransactionHandler.run(async () => {
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
            })

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
            const movedTask = await TransactionHandler.run(async () => {
                const taskId = payload.task_id
                    
                const targetRowIndex = payload.target_row_index
                const targetColumnId = payload.target_column_id
                const targetSubprojectId = payload.target_subproject_id
                
                const sourceRowIndex = payload.source_row_index
                const sourceColumnId = payload.source_column_id
                const sourceSubprojectId = payload.source_subproject_id
        
                // in case target column is not the same as source column we switch them
                if (targetColumnId !== sourceColumnId) {
                    await ColumnService.unassignTaskFromColumn(sourceColumnId, taskId)
                    await ColumnService.assignTaskToColumn(targetColumnId, taskId)
                }
        
                // if user wants to change given tasks subproject
                if (targetSubprojectId !== sourceSubprojectId) {
                    await SubprojectService.unassignTaskFromSubproject(sourceSubprojectId, taskId)
                    await SubprojectService.assignTaskToSubproject(targetSubprojectId, taskId)
                }
                
                // adjust all tasks in target and source columns (move tasks above in source column task down, move tasks above in target column up)
                await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId, sourceSubprojectId)
                await this.moveTasksAboveRowIndexUp(targetRowIndex, targetColumnId, targetSubprojectId, true)
        
                const update = { 
                    row_index: targetRowIndex,
                    column: targetColumnId,
                }
                
                const movedTask = await TaskRepository.update(taskId, update)
                if (movedTask == null) {
                    throw new Error('An error occured, no tasks moved')
                }
                
                return movedTask
            })

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
    static async moveTasksAboveRowIndexDown(rowIndex, columnId, subprojectId, including = false) {
        try {
            await TransactionHandler.run(async () => {
                const column = await ColumnRepository.findById(columnId)
                if (column == null) {
                    throw new Error('Found no column of given ID')
                }

                const update = {
                    $inc: { row_index: -1 },
                }
        
                await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, subprojectId, including)

                return
            })

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
    static async moveTasksAboveRowIndexUp(rowIndex, columnId, subprojectId, including = false) {
        try {
            await TransactionHandler.run(async () => {
                const column = await ColumnRepository.findById(columnId)
                if (column == null) {
                    throw new Error('Found no column of given ID')
                }
    
                const update = {
                    $inc: { row_index: 1 },
                }
        
                await this.changeColumnTasksRowIndexes(update, rowIndex, columnId, subprojectId, including)
        
                return
            })

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
    static async changeColumnTasksRowIndexes(update, rowIndex, columnId, subprojectId, including = false) {
        try {
            await TransactionHandler.run(async () => {
                const filter = {
                    column: columnId,
                    subproject: subprojectId,
                }
        
                filter.row_index = including === true ? { $gte: rowIndex } : { $gt: rowIndex }
    
                await TaskRepository.findManyByFilterAndUpdate(filter, update)

                return
            })

            return
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
            const updatedTask = await TransactionHandler.run(async () => {
                const taskId = payload.task_id
                const content = payload.content
                const colorId = payload.color_id
        
                const task = await TaskRepository.findById(taskId)
                if (task == null) {
                    throw new Error('Found no task of given ID')
                }
    
                let update = { 
                    content, 
                }
                
                if (colorId != null) {
                    update.color_id = colorId
                }

                const updatedTask = await TaskRepository.update(taskId, update)
                if (updatedTask == null) {
                    throw new Error('An error occured, no tasks updated')
                }
    
                return updatedTask
            })

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
            const removedTask = await TransactionHandler.run(async () => {
                const taskId = payload.task_id
                const sourceSubprojectId = payload.source_subproject_id
                const sourceRowIndex = payload.source_row_index
                const sourceColumnId = payload.source_column_id
        
                const task = await TaskRepository.findById(taskId)
                if (task == null) {
                    throw new Error('Found no task of given ID')
                }
        
                await ColumnService.unassignTaskFromColumn(sourceColumnId, taskId)
        
                // after we remove the task we move all tasks above it to fill the created gap
                await this.moveTasksAboveRowIndexDown(sourceRowIndex, sourceColumnId, sourceSubprojectId)
    
                // remove reference to this task from its subproject, remove reference to subproject from task
                await SubprojectService.unassignTaskFromSubproject(sourceSubprojectId, taskId)
    
                await this.unassignTaskFromUsers(taskId)
        
                const removedTask = await TaskRepository.remove(task)
                if (removedTask == null) {
                    throw new Error('An error occured, removed no tasks')
                }
        
                return removedTask
            }) 

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
                    path: 'subproject',
                    model: 'Subproject',
                },
                {
                    path: 'users',
                    model: 'User',
                },
            ]
    
            return await TaskRepository.populate(task, populateConfig)
        } catch (exception) {
            throw new Error(`Failed to get one task: ${exception.message}`)
        }
    }

    /**
     * @return {Object}
     */
    static async getAllTasks() {
        try {
            const tasks = await TaskRepository.findAll()

            let result = []

            const populateConfig = [
                {
                    path: 'users',
                    model: 'User',
                },
            ]

            for (let task of tasks) {
                result.push(await TaskRepository.populate(task, populateConfig))
            }

            return result
        } catch (exception) {
            throw new Error(`Failed to get all tasks: ${exception.message}`)
        }
    }

    /**
     * Iterate over all users of given task, remove reference to that task
     * 
     * @param {String} taskId
     * @return {void} 
     */
    static async unassignTaskFromUsers(taskId) {
        try {
            await TransactionHandler.run(async () => {
                let task = await TaskRepository.findById(taskId)
                if (task == null) {
                    throw new Error('Found no task of given ID')
                }
    
                const populateConfig = [
                    {
                        path: 'users',
                        model: 'User',
                    },
                ]
    
                let populatedTask = await TaskRepository.populate(task, populateConfig)
                let users = populatedTask.users
    
                // iterate over all users, remove reference to this task from user, remove reference to user from this task
                users.forEach(async user => {
                    user.tasks.pull(task)
                    await user.save()
    
                    task.users.pull(user)
                })
    
                await task.save()
    
                return
            })

            return
        } catch (exception) {
            throw new Error(`Failed to unassign task from users: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static async assignUserToTask(payload) {
        try {
            await TransactionHandler.run(async () => {
                const userId = payload.user_id
                const targetTaskId = payload.task_id
    
                const user = await UserRepository.findById(userId)
                if (user == null) {
                    throw new Error('Found no user of given ID')
                }
    
                const targetTask = await TaskRepository.findById(targetTaskId)
                if (targetTask == null) {
                    throw new Error('Found no task of given ID')
                }
    
                // add reference to assigned user to target task
                targetTask.users.push(user)
                await targetTask.save()
    
                // add reference to task to assigned user
                user.tasks.push(targetTask)
                await user.save()
    
                return
            })

            return
        } catch (exception) {
            throw new Error(`Failed to assign user to task: ${exception.message}`)
        }
    }

    /**
     * @param {Object} payload
     * @return {void} 
     */
    static async unassignUserFromTask(payload) {
        try {
            await TransactionHandler.run(async () => {
                const userId = payload.user_id
                const targetTaskId = payload.task_id
    
                const user = await UserRepository.findById(userId)
                if (user == null) {
                    throw new Error('Found no user of given ID')
                }
    
                const targetTask = await TaskRepository.findById(targetTaskId)
                if (targetTask == null) {
                    throw new Error('Found no task of given ID')
                }
    
                targetTask.users.pull(userId)
                await targetTask.save()
    
                user.tasks.pull(targetTaskId)
                await user.save()
    
                return
            })

            return
        } catch (exception) {
            throw new Error(`Failed to unassign user from task: ${exception.message}`)
        }
    }
}

module.exports = TaskService