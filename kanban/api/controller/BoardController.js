const Note = require("../database/model/Note");
const Column = require("../database/model/Column");
const ColumnValidator = require('../validation/column/ColumnValidator')
const NoteValidator = require('../validation/note/NoteValidator')

class BoardController {
    /**
     * Get list of columns and notes
     * 
     * @param {Object|null} payload
     * @param {Function} callback
     * @return void
     */
    static async getBoard(callback) {
        try {
            let columns = await Column.find({});
            let notes = await Note.find({});
        
            ColumnValidator.validateGetAllResponse(columns)
            NoteValidator.validateGetAllResponse(notes)
        
            callback({
                status: true,
                payload: {
                    columns,
                    notes
                }
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while getting list of notes: ${exception.message}`
            })

            return
        }
    }
}

module.exports = BoardController