const ColumnValidator = require('../validation/column/ColumnValidator')
const ColumnRepository = require('../database/repository/ColumnRepository')
const NoteValidator = require('../validation/note/NoteValidator')
const NoteRepository = require('../database/repository/NoteRepository')

class BoardController {
    /**
     * Get list of columns and notes
     * 
     * @param {Object|null} payload
     * @param {Function} callback
     * @return void
     */


    /**
     * 
     * This is a function
     * Function gets columns and notes from a board
     * @param {Function} callback 
     * @return {void}
     */


    static async getBoard(callback) {

        /**
         * @throws Callback status must be true
         */

        try {
            let columns = await ColumnRepository.findAll()
            let notes = await NoteRepository.findAll()
        
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