const mongoose = require('mongoose')
const Note = require('../model/Note')
const noteConfig = require('../../config/note')

class NoteRepository {
    /**
     * Create a new note
     * 
     * @param {String} content 
     * @param {Number} rowIndex 
     * @param {String} columnId
     * @return {Object} 
     */
    static async create(content, rowIndex, columnId) {
        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            content,
            row_index: rowIndex,
            column_id: columnId,
        })

        return await newNote.save()
    }

    /**
     * Get one note with specified parameters as filter
     * 
     * @param {Object} filter
     * @return {Object} 
     */
    static async findOneByFilter(filter) {
        return await Note.findOne(filter)
    }

    /**
     * Find many notes with specified parameters as filter
     * 
     * @param {Object} filter 
     * @return {Object}
     */
    static async findManyByFilter(filter) {
        return await Note.find(filter)
    }

    /**
     * Get all notes (filter not specified, returns all of them)
     * 
     * @return {Array}
     */
    static async findAll() {
        return await Note.find({})
    }

    /**
     * Find one note and update it, in case more than one note 
     * passes the filter only the first one is updated
     * 
     * @param {Object} filter 
     * @param {Object} update 
     * @return {Object}
     */
    static async findOneByFilterAndUpdate(filter, update) {
        return await Note.findOneAndUpdate(filter, update, {
            new: noteConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: noteConfig.repository.USE_FIND_AND_MODIFY,
        })
    }

    /**
     * Find many notes with given filter, update all, response contains
     * 'n' field with number of matched documents and 'nModified' field with
     * number of documents modified
     * 
     * @param {Object} filter 
     * @param {Object} update
     * @return {Object} 
     */
    static async findManyByFilterAndUpdate(filter, update) {
        return await Note.updateMany(filter, update)
    }

    /**
     * Delete one note found by parameters specified in filter. If more than one note 
     * passes the filter only one of those is removed
     * 
     * @param {Object} filter
     * @return {Object} 
     */
    static async deleteOneByFilter(filter) {
        return await Note.deleteOne(filter)
    }
}

module.exports = NoteRepository