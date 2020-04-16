const ProjectRepository = require('../database/repository/ProjectRepository')
const SubprojectRepository = require('../database/repository/SubprojectRepository')
const ColumnRepository = require('../database/repository/ColumnRepository')

class ProjectService {
    /**
     * Create a project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async createProject(payload) {
        try {
            const projectName = payload.project_name
            const totalBudget = payload.total_budget

            const createdProject = await ProjectRepository.create(projectName, totalBudget)
            if (createdProject == null) {
                throw new Error('An error occured, no projects created.')
            }

            return createdProject
        } catch (exception) {
            throw new Error(`Failed to create a project: ${exception.message}`)
        }
    }

    /**
     * Update one project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async updateProject(payload) {
        try {
            const projectId = payload.project_id
            const projectName = payload.project_name
            const usedBudget = payload.used_budget
            const totalBudget = payload.total_budget
            
            const update = {
                project_name: projectName,
                used_budget: usedBudget,
                total_budget: totalBudget,
            }
    
            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID.')
            }

            const updatedProject = await ProjectRepository.update(projectId, update)
            if (updatedProject == null) {
                throw new Error('An error occured, no projects updated.')
            }

            return updatedProject
        } catch (exception) {
            throw new Error(`Failed to update the project: ${exception.message}.`)
        }
    }

    /**
     * Remove one project
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeProject(payload) {
        try {
            const projectId = payload.project_id

            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID.')
            }

            const removedProject = await ProjectRepository.remove(project)
            if (removedProject == null) {
                throw new Error('An error occured, no projects removed.')
            }

            return removedProject
        } catch (exception) {
            throw new Error(`Failed to remove the project: ${exception.message}.`)
        }
    }

    /**
     * Unassign column from project
     * 
     * @param {String} columnId 
     * @param {String} projectId
     * @return {void} 
     */
    static async unassignColumnFromProject(columnId, projectId) {
        try {
            const column = await ColumnRepository.findById(columnId)
            if (column == null) {
                throw new Error('Found no column of given ID')
            }

            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID')
            }
    
            project.columns.pull(columnId)
    
            await project.save()
        } catch (exception) {
            throw new Error(`Failed to unassign the column from the project: ${exception.message}`)
        }
    }

    /**
     * Find a project by ID, assign column found by ID to it
     * 
     * @param {String} columnId 
     * @param {String} projectId 
     * @return {void}
     */
    static async assignColumnToProject(columnId, projectId) {
        try {
            // get project we want the column to assign to
            const targetProject = await ProjectRepository.findById(projectId)
            if (targetProject == null) {
                throw new Error('Found no project of given ID.')
            }

            // get the column assigned to project
            const column = await ColumnRepository.findById(columnId)
            if (column == null) {
                throw new Error('Found no column of given ID.')
            }
            
            targetProject.columns.push(column)
        
            await targetProject.save()
            
            return
        } catch (exception) {
            throw new Error(`Failed to assign the column to the project: ${exception.message}`)
        }
    }

    /**
     * Assign given subproject to parent project
     * 
     * @param {String} subprojectid 
     * @param {String} projectId
     * @return {void}
     */
    static async assignSubprojectToProject(subprojectId, projectId) {
        try {
            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID')
            }

            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID')
            }

            project.subprojects.push(subproject)

            await project.save()

            return
        } catch (exception) {
            throw new Error(`Failed to assign subproject to project: ${exception.message}`)
        }
    }

    /**
     * Unassign subproject of given ID from project of given ID
     * 
     * @param {String} subprojectId 
     * @param {String} projectId
     * @return {void} 
     */
    static async unassignSubprojectFromProject(subprojectId, projectId) {
        try {
            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID')
            }

            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID')
            }

            project.subprojects.pull(subprojectId)

            await project.save()

            return
        } catch (exception) {
            throw new Error(`Failed to unassign subproject from project: ${exception.message}`)
        }
    }

    /**
     * Get one project, populate it
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOneProject(payload) {
        try {
            const projectId = payload.project_id

            const project = await ProjectRepository.findById(projectId)
            if (project == null) {
                throw new Error('Found no project of given ID.')
            }

            // populate columns field, populate tasks field in every column
            const populateConfig = [
                {
                    path: 'columns',
                    model: 'Column',
                    populate: {
                        path: 'tasks',
                        model: 'Task',
                    },
                },
            ]
            
            return await ProjectRepository.populate(project, populateConfig)
        } catch (exception) {
            throw new Error(`Failed to get one project: ${exception.message}`)
        }
    }

    /**
     * Get all projects
     * 
     * @return {Array}
     */
    static async getAllProjects() {
        try {
            return await ProjectRepository.findAll()
        } catch (exception) {
            throw new Error(`Failed to get list of all projects: ${exception.message}.`)
        }
    }
}

module.exports = ProjectService