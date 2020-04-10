const mongoose = require('mongoose')
const Task = require('../model/Task')
const taskConfig = require('../../config/task')

class TaskRepository {
    /**
     * Create a new task
     * 
     * @param {String} content
     * @param {Number} rowIndex
     * @param {String} columnId
     * @return {Object} 
     */
    static async create(content, rowIndex, columnId) {
        const newTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            content,
            row_index: rowIndex,
            column: columnId,
        })

        return await newTask.save()
    }

    /**
     * Update given task
     * 
     * @param {String} taskId
     * @param {Object} update 
     */
    static async update(taskId, update) {
        if (taskId == null || taskId == "") {
            throw new Error('Invalid task ID.')
        }

        return await Task.findByIdAndUpdate(taskId, update, {
            new: taskConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: taskConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Remove given task
     * 
     * @param {Object} task
     * @return {Object} removed task 
     */
    static async remove(task) {
        if (task == null) {
            throw new Error('Cannot remove an empty task.')
        }

        return await task.remove()
    }

    /**
     * Get all tasks (filter not specified, returns all of them)
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Task.find({})
    }

    /**
     * Find many tasks with specified parameters as filter
     * 
     * @param {Object} filter 
     * @return {Object}
     */
    static async findManyByFilter(filter) {
        return await Task.find(filter)
    }

    /**
     * Find one task by filter
     * 
     * @param {Object} filter
     * @return {Object}
     */
    static async findOneByFilter(filter) {
        return await Task.findOne(filter)
    }

    /**
     * Find many tasks with given filter, update all, response contains
     * 'n' field with number of matched documents and 'nModified' field with
     * number of documents modified
     * 
     * @param {Object} filter 
     * @param {Object} update
     * @return {Object} 
     */
    static async findManyByFilterAndUpdate(filter, update) {
        return await Task.updateMany(filter, update)
    }

    /**
     * Find all tasks matching filter and remove them
     * 
     * @param {Object} filter 
     * @return {Object} // data about removed data (deletedCount etc)
     */
    static async findManyByFilterAndRemove(filter) {
        return await Task.remove(filter)
    }

    /**
     * Find one task by ID
     * 
     * @param {string} taskId
     * @return {Object} 
     */
    static async findById(taskId) {
        return await Task.findById(taskId)
    }

    /**
     * Populate selected fields in given task
     * 
     * @param {Object} task 
     * @param {Object} populateConfig 
     */
    static async populate(task, populateConfig) {
        if (task == null) {
            throw new Error('Cannot populate an empty task.')
        }

        return await task.populate(populateConfig).execPopulate()
    }
}

module.exports = TaskRepository