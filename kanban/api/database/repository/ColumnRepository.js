const mongoose = require('mongoose')
const Column = require('../model/Column')
const Task = require('../model/Task')

class ColumnRepository {
    /**
     * Find all columns (filter not specified, returns all)
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Column.find({}).populate('tasks')
    }

    /**
     * Find column by id
     * 
     * @param {Object} columnId 
     * @return {void}
     */
    static async findById(columnId) {
        return await Column.findById(columnId)
    }

    /**
     * Create a new column
     * 
     * @return {Object} 
     */
    static async create(name, boardIndex, maxTasks) {
        const newColumn = new Column({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            board_index: boardIndex,
            max_tasks: maxTasks,
        })

        return await newColumn.save()
    }

    /**
     * Get column with which the task column is assigned
     * 
     * @param {string} taskId 
     * @return {Object}
     */
    static async getColumnByTaskId(taskId) {
        let response = await Task.findById(taskId).populate('column')

        if (response.column == null) {
            throw new Error('Found no column assigned to that task')
        }

        return response.column
    }

    /**
     * Get columns by filter and update
     * 
     * @param {Object} filter 
     * @param {Object} update 
     * @return {Object}
     */
    static async findByFilterAndUpdate(filter, update) {
        return await Column.updateMany(filter, update)
    }
}

module.exports = ColumnRepository