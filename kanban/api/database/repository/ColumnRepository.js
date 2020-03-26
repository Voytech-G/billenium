const mongoose = require('mongoose')
const Column = require('../model/Column')
const Task = require('../model/Task')
const columnConfig = require('../../config/column')

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

    /**
     * Find one column and update it, return updated column
     * 
     * @param {Object} filter 
     * @param {Object} update
     * @return {Object}
     */
    static async findOneByFilterAndUpdate(filter, update) {
        return await Column.findOneAndUpdate(filter, update, {
            new: columnConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: columnConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Find all columns matching filter and remove them
     * 
     * @param {Object} filter 
     * @return {Object} // data about deleted data
     */
    static async findManyByFilterAndRemove(filter) {
        return await Column.remove(filter)
    }
    /**
     * Find one task by filter and remove it
     * 
     * @param {Object} filter
     * @return {Object} // removed column 
     */
    static async findOneByFilterAndRemove(filter) {
        return await Column.findOneAndRemove(filter)
    }
    /**
     * Delete one task found by parameters specified in filter. If more than one task 
     * passes the filter only one of those is removed
     * 
     * @param {Object} filter
     * @return {Object} //removed column
     */
    static async deleteOneByFilter(filter) {
        return await Column.deleteOne(filter)
    }
}

module.exports = ColumnRepository