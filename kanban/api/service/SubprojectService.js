const ProjectService = require('../service/ProjectService')
const TaskRepository = require('../database/repository/TaskRepository')
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
            const rowIndex = payload.row_index
            
            const createdSubproject = await SubprojectRepository.create(subprojectName, parentProjectId, rowIndex)
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
                throw new Error('An error occured, no subprojects updated')
            }

            return updatedSubproject
        } catch (exception) {
            throw new Error(`Failed to update the subproject: ${exception.message}`)
        }
    }

    /**
     * Remove project of given ID
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async removeSubproject(payload) {
        try {
            const subprojectId = payload.subproject_id
            const parentProjectId = payload.project_id

            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no project of given ID')
            }

            await ProjectService.unassignSubprojectFromProject(subprojectId, parentProjectId)
            await this.unassignSubprojectFromTasks(subprojectId)
            
            const removedSubproject = await SubprojectRepository.remove(subproject)
            if (removedSubproject == null) {
                throw new Error('An error occured, removed no subprojects')
            }

            // move all subprojects above removed subprojects down to remove gaps in row_indexes
            const removedSubprojectRowIndex = removedSubproject.row_index
            await this.moveSubprojectsAboveRowIndexDown(parentProjectId, removedSubprojectRowIndex) 

            return removedSubproject
        } catch (exception) {
            throw new Error(`Failed to remove the subproject: ${exception.message}`)
        }
    }

    /**
     * Get one subproject, populate selected fields
     * 
     * @param {Object} payload
     * @return {Object} 
     */
    static async getOneSubproject(payload) {
        try {
            const subprojectId = payload.subproject_id

            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID.')
            }

            // populate columns field, populate tasks field in every column
            const populateConfig = [
                {
                    path: 'project',
                    model: 'Project',
                    // populate: {
                    //     path: 'tasks',
                    //     model: 'Task',
                    // },
                },
                {
                    path: 'tasks',
                    model: 'Task',
                }
            ]
            
            return await SubprojectRepository.populate(subproject, populateConfig)
        } catch (exception) {
            throw new Error(`Failed to get one subproject: ${exception.message}`)
        }
    }

    /**
     * Move all subprojects above given row_index down
     * 
     * @param {String} projectId 
     * @param {Number|String} rowIndex 
     */
    static async moveSubprojectsAboveRowIndexDown(projectId, rowIndex) {
        try {
            const filter = {
                project: projectId,
                row_index: { $gt: rowIndex },
            }
            
            const update = {
                $inc: { row_index: -1 },
            }

            return await SubprojectRepository.findManyByFilterAndUpdate(filter, update)
        } catch (exception) {
            throw new Error(`Failed to move subprojects above row index down: ${exception.message}`)
        }
    }

    /**
     * Remove reference to this subproject from all tasks assigned to it
     * 
     * @param {String} subprojectId
     * @return {void} 
     */
    static async unassignSubprojectFromTasks(subprojectId) {
        try {
            const filter = {
                subproject: subprojectId,
            }

            const update = {
                subproject: null,
            }

            await TaskRepository.findManyByFilterAndUpdate(filter, update)

            return
        } catch (exception) {
            throw new Error(`Failed to unassign subproject from tasks assigned to it: ${exception.message}`)
        }
    }

    /**
     * Assign task to subproject
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static async assignTaskToSubproject(subprojectId, taskId) {
        try {
            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID')
            }

            const task = await TaskRepository.findById(taskId)
            if (task == null) {
                throw new Error('Found no task of given ID')
            }

            task.subproject = subproject
            await task.save()

            subproject.tasks.push(task)
            await subproject.save()

            return
        } catch (exception) {
            throw new Error(`Failed to assign task to subproject: ${exception.message}`)
        }
    }

    /**
     * Unassign given task from a subproject
     * 
     * @param {Object} payload
     * @return {void} 
     */
    static async unassignTaskFromSubproject(subprojectId, taskId) {
        try {
            const subproject = await SubprojectRepository.findById(subprojectId)
            if (subproject == null) {
                throw new Error('Found no subproject of given ID')
            }

            const task = await TaskRepository.findById(taskId)
            if (task == null) {
                throw new Error('Found no task of given ID')
            }

            task.subproject = null
            await task.save()

            subproject.tasks.pull(taskId)
            await subproject.save()

            return
        } catch (exception) {
            throw new Error(`Failed to unassign task from subproject: ${exception.message}`)
        }
    }
}

module.exports = SubprojectService