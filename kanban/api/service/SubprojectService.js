const ProjectService = require('../service/ProjectService')
const SubprojectRepository = require('../database/repository/SubprojectRepository')

class SubprojectService {
    /**
     * Create subproject, assign subproject to parent project
     * 
     * @param {Object} payload
     * @return {Object} created subproject 
     */
    static async createSubproject(payload) {
        try {
            const parentProjectId = payload.project_id
            const subprojectName = payload.subproject_name
            
            const createdSubproject = await SubprojectRepository.create(subprojectName, parentProjectId)
            if (createdSubproject == null) {
                throw new Error('An error occured, no subprojects created')
            }

            const subprojectId = createdSubproject.id
            await ProjectService.assignSubprojectToProject(subprojectId, parentProjectId)

            return createdSubproject
        } catch (exception) {
            throw new Error(`Failed to create a new subproject: ${exception.message}`)
        }
    }

    // static async updateSubproject(payload) {
    //     try {

    //     } catch (exception) {
    //         throw new Error(`Failed to update the subproject: ${exception.message}`)
    //     }
    // }

    // static async removeSubproject(payload) {
    //     try {

    //     } catch (exception) {
    //         throw new Error(`Failed to remove the subproject: ${exception.message}`)
    //     }
    // }

    // static async getOneSubproject(payload) {
    //     try {

    //     } catch (exception) {
    //         throw new Error(`Failed to get one subproject: ${exception.message}`)
    //     }
    // }
}

module.exports = SubprojectService