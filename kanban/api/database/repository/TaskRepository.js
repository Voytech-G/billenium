const mongoose = require('mongoose')
const Task = require('../model/Task')
const Column = require('../model/Column')
const taskConfig = require('../../config/task')
const ColumnService = require('../../service/ColumnService')

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

        const taskId = newTask.id
        await ColumnService.assignTaskToColumn(columnId, taskId)

        await newTask.save()

        return newTask
    }

    /**
     * Get one task with specified parameters as filter
     * 
     * @param {Object} filter
     * @return {Object} 
     */
    static async findOneByFilter(filter) {
        return await Task.findOne(filter)
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
     * Get all tasks (filter not specified, returns all of them)
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Task.find({})
    }

    /**
     * Find one task and update it, in case more than one task 
     * passes the filter only the first one is updated
     * 
     * @param {Object} filter 
     * @param {Object} update 
     * @return {Object}
     */
    static async findOneByFilterAndUpdate(filter, update) {
        return await Task.findOneAndUpdate(filter, update, {
            new: taskConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: taskConfig.repository.USE_FIND_AND_MODIFY,
        })
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
     * Delete one task found by parameters specified in filter. If more than one task 
     * passes the filter only one of those is removed
     * 
     * @param {Object} filter
     * @return {Object} 
     */
    static async deleteOneByFilter(filter) {
        return await Task.deleteOne(filter)
    }

    /**
     * Get all tasks in given column by its ID
     * 
     * @param {string} columnId 
     */
    static async getTasksByColumnId(columnId) {
        return await Column.findById(columnId).populate('tasks')
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
}

module.exports = TaskRepository