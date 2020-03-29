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
     * Find column by ID
     * 
     * @param {Object} columnId 
     * @return {void}
     */
    static async findById(columnId) {
        const column = await Column.findById(columnId)

        if (column == null) {
            throw new Error('Found no column of given ID')
        }

        return column
    }

     /**
     * Find column by ID and populate given field
     * 
     * @param {Object} columnId 
     * @return {void}
     */
    static async findByIdAndPopulate(columnId, populateFields) {
        let column = await Column.findById(columnId)

        if (column == null) {
            throw new Error('Found no column of given ID')
        }

        // need to call execPopulate() method as populating previously retrieved document needs 
        // that method to get called
        return await column.populate(populateFields).execPopulate()
    }

    /**
     * Create a new column
     * 
     * @param {String} name
     * @param {Number} boardIndex
     * @param {Number} maxTasks
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
    static async findManyByFilterAndUpdate(filter, update) {
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
     * @return {Object} // data about the remove transaction (number of removed entities etc)
     */
    static async findManyByFilterAndRemove(filter) {
        return await Column.remove(filter)
    }

    /**
     * Find one column by filter and remove it
     * 
     * @param {Object} filter
     * @return {Object} // removed column data
     */
    static async findOneByFilterAndRemove(filter) {
        return await Column.findOneAndRemove(filter, {
            useFindAndModify: columnConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Find one column by ID and remove it
     * 
     * @param {Number} columnId 
     * @return {Object} // removed column data
     */
    static async findByIdAndRemove(columnId) {
        return await Column.findByIdAndRemove(columnId, {
            useFindAndModify: columnConfig.repository.USE_FIND_AND_MODIFY,
        })
    }
}

module.exports = ColumnRepository