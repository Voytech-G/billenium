const TaskRepository = require('../repository/TaskRepository')
const columnConfig = require('../../config/column')

class ColumnHandler {
    /**
     * Handle column removed
     * 
     * @param {Object} column
     * @return {void} 
     */
    static async handleColumnRemoved(column) {
        // check if we should remove referenced tasks
        if (columnConfig.REMOVE_TASKS_ON_COLUMN_DELETE === false) {
            return
        }
        
        const columnId = column.id
    
        const filter = {
            column: columnId,
        }
    
        const tasks = await TaskRepository.findManyByFilter(filter)
    
        tasks.forEach(async task => {
            await task.remove()
        })

        return
    }
}

module.exports = ColumnHandler