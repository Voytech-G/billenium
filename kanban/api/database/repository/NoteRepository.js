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
     * Find one note and update it
     * 
     * @param {Object} filter 
     * @param {Object} update 
     * @return {Object}
     */
    static async findOneAndUpdate(filter, update) {
        return await Note.findOneAndUpdate(filter, update, {
            new: noteConfig.repository.RETURN_NEW_AFTER_UPDATE,
            useFindAndModify: noteConfig.repository.USE_FIND_AND_MODIFY,
        })
    }
}

module.exports = NoteRepository