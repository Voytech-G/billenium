const ColumnRepository = require('../database/repository/ColumnRepository')

class ProjectHandler {
    /**
     * Handle project removed
     * 
     * @param {Object} project
     * @return {void} 
     */
    static async handleProjectRemoved(project) {
        const projectId = project.id

        const filter = {
            project: projectId,
        }

        const columns = await ColumnRepository.findManyByFilter(filter)

        columns.forEach(async column => {
            await column.remove()
        })

        return
    }
}

module.exports = ProjectHandler