class TaskHandler {
    /**
     * Handle task removed
     * 
     * @param {Object} task
     * @return {void} 
     */
    static async handleTaskRemoved(task) {
        console.log(`removed task of ID: ${task.id}`)

        return
    }
}

module.exports = TaskHandler