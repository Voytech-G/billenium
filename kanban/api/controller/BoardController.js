const ColumnValidator = require('../validation/column/ColumnValidator')
const ColumnRepository = require('../database/repository/ColumnRepository')
const TaskValidator = require('../validation/task/TaskValidator')
const TaskRepository = require('../database/repository/TaskRepository')

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
            let tasks = await TaskRepository.findAll()
        
            ColumnValidator.validateGetAllResponse(columns)
            TaskValidator.validateGetAllResponse(tasks)
        
            callback({
                status: true,
                payload: {
                    columns,
                    tasks
                }
            })

            return
        } catch (exception) {
            callback({
                status: false,
                message: `An error occured while getting list of tasks: ${exception.message}`
            })

            return
        }
    }
}

module.exports = BoardController