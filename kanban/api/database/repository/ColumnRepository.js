const mongoose = require('mongoose')
const Column = require('../model/Column')
const columnConfig = require('../../config/column')

class ColumnRepository {
    /**
     * Create a new column
     * 
     * @param {String} projectId
     * @param {String} name
     * @param {Number} boardIndex
     * @param {Number} maxTasks
     * @return {Object} 
     */
    static async create(projectId, name, boardIndex, maxTasks) {
        const newColumn = new Column({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            board_index: boardIndex,
            max_tasks: maxTasks,
            project: projectId,
        })

        return await newColumn.save()
    }
    
    /**
     * Remove given column
     * 
     * @param {Object} column
     * @return {Object} 
     */
    static async remove(column) {
        if (column == null) {
            throw new Error('Cannot remove an empty column.')
        }

        return await column.remove()
    }

    /**
     * Find all columns (filter not specified, returns all)
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Column.find({})
    }

    /**
     * Find column by ID
     * 
     * @param {Object} columnId 
     * @return {void}
     */
    static async findById(columnId) {
        return await Column.findById(columnId)
    }

    static async populate(column, populateConfig) {
        if (column == null) {
            throw new Error('Cannot populate an empty column.')
        }

        return await column.populate(populateConfig).execPopulate()
    }

    /**
     * Update given column
     * 
     * @param {Object} column 
     * @param {Object} update 
     */
    static async update(column, update) {
        if (column == null) {
            throw new Error('Cannot update an empty column.')
        }

        return await column.update(update).exec()
    }

    /**
     * Find many columns with specified parameters as filter
     * 
     * @param {Object} filter 
     * @return {Object}
     */
    static async findManyByFilter(filter) {
        return await Column.find(filter)
    }

    /**
     * Find one column by filter
     * 
     * @param {Object} filter
     * @return {Object} 
     */
    static async findOneByFilter(filter) {
        return await Column.findOne(filter)
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
}

module.exports = ColumnRepository