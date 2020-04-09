const mongoose = require('mongoose')
const Column = require('../model/Column')
const columnConfig = require('../../config/column')

class ColumnRepository {
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

     /**
     * Find column by ID and populate given field
     * 
     * @param {Object} columnId 
     * @return {void}
     */
    static async findByIdAndPopulate(columnId, populateFields) {
        let column = await Column.findById(columnId)

        if (column == null) {
            throw new Error('Failed to populate the column, found no column of given ID')
        }

        // need to call execPopulate() method as populating previously retrieved document needs 
        // that method to get called
        return await column.populate(populateFields).execPopulate()
    }

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
     * Find many columns with specified parameters as filter
     * 
     * @param {Object} filter 
     * @return {Object}
     */
    static async findManyByFilter(filter) {
        return await Column.find(filter)
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
     * Find one column by ID and remove it
     * 
     * @param {Number} columnId 
     * @return {Object} // removed column data
     */
    static async findByIdAndRemove(columnId) {
        const column = await Column.findById(columnId)

        if (column == null) {
            throw new Error('Found no column of given ID to remove.')
        }

        return await column.remove()
    }
}

module.exports = ColumnRepository