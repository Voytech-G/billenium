const TaskRepository = require('../repository/TaskRepository')
const subprojectConfig = require('../../config/subproject')

class SubprojectHandler {
    /**
     * Handle subproject removed
     * 
     * @param {Object} subproject
     * @return {void} 
     */
    static async handleSubprojectRemoved(subproject) {
        // check if we should remove referenced tasks
        if (subprojectConfig.REMOVE_TASKS_ON_SUBPROJECT_DELETE === false) {
            return
        }
        
        const subprojectId = subproject.id
    
        const filter = {
            subproject: subprojectId,
        }
    
        const tasks = await TaskRepository.findManyByFilter(filter)
        
        tasks.forEach(async task => {
            await task.remove()
        })

        return
    }
}

module.exports = SubprojectHandler