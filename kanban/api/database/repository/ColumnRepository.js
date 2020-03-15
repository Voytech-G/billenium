// const mongoose = require('mongoose')
const Column = require('../model/Column')

class ColumnRepository {
    /**
     * Find all columns (filter not specified, returns all)
     */
    static async findAll() {
        return await Column.find({})
    }
}

module.exports = ColumnRepository