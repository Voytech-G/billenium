const ColumnRepository = require('../database/repository/ColumnRepository')

class BoardController {
    /**
     * Get list of columns and tasks
     * 
     * @param {Object|null} payload
     * @param {Function} callback
     * @return {void}
     */
    static async getBoard(callback) {
        try {
            let columns = await ColumnRepository.findAll()
        
            callback({
                status: true,
                payload: {
                    columns,
                }
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while getting the board: ${exception.message}`
            })

            return
        }
    }
}

module.exports = BoardController