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

    /**
     * Update subproject found by given subproject ID
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateSubproject(payload) {
        try {
            const subprojectId = payload.subproject_id
            const subprojectName = payload.subproject_name

            // check if subproject of given ID exists
            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID')
            }

            const update = {
                subproject_name: subprojectName,
            }

            const updatedSubproject = await SubprojectRepository.update(subprojectId, update)
            if (updatedSubproject == null) {
                throw new Error('An error occured, no subprojects updated.')
            }

            return updatedSubproject
        } catch (exception) {
            throw new Error(`Failed to update the subproject: ${exception.message}`)
        }
    }

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