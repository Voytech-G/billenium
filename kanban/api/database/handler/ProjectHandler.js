const ColumnRepository = require('../repository/ColumnRepository')
const SubprojectRepository = require('../repository/SubprojectRepository')

class ProjectHandler {
    /**
     * Handle project removed
     * 
     * @param {Object} project
     * @return {void} 
     */
    static async handleProjectRemoved(project) {
        const projectId = project.id

        let filter = {
            project: projectId,
        }

        const columns = await ColumnRepository.findManyByFilter(filter)
        columns.forEach(async column => {
            await column.remove()
        })

        const subprojects = await SubprojectRepository.findManyByFilter(filter)
        subprojects.forEach(async subproject => {
            await subproject.remove()
        })

        return
    }
}

module.exports = ProjectHandler