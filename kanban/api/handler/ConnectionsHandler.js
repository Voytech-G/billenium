const TaskController = require('../controller/TaskController')
const ProjectController = require('../controller/ProjectController')
const ColumnController = require('../controller/ColumnController')
const AuthenticationController = require('../controller/AuthenticationController')
const AuthenticationService = require('../service/AuthenticationService')

class ConnectionsHandler {
    /**
     * Setup a socket.io connection, register events
     * 
     * @param {Object} socket
     * @return {void} 
     */
    static async setupConnection(socket) {
        console.log(`Socket of ID: ${socket.id} has just connected`);
        
        // method run every incoming event
        socket.use((payload, next) => {
            const authorized = AuthenticationService.authenticateIncomingEvent(payload, next)

            if (!authorized) {
                return next()
            }

            next()
        })

        socket.on('authenticate', async (payload, callback) => {
            AuthenticationController.authenticate(socket, payload, callback)

            return
        })

        socket.on('sign-up', async (payload, callback) => {
            AuthenticationController.signUp(payload, callback)

            return
        })

        socket.on('create-project', async (payload, callback) => {
            ProjectController.create(payload, callback)

            return
        })

        socket.on('update-project', async (payload, callback) => {
            ProjectController.update(payload, callback)

            return
        })

        socket.on('remove-project', async (payload, callback) => {
            ProjectController.remove(payload, callback)

            return
        })

        socket.on('get-project', async (payload, callback) => {
            ProjectController.getOne(payload, callback)

            return
        })

        socket.on('get-all-projects', async callback => {
            ProjectController.getAll(callback)

            return
        })

        socket.on('create-task', (payload, callback) => {
            TaskController.create(payload, callback)

            return
        })

        socket.on('update-task', (payload, callback) => {
            TaskController.update(payload, callback)
        
            return
        })

        socket.on('move-task', (payload, callback) => {
            TaskController.move(payload, callback)

            return
        })

        socket.on('remove-task', (payload, callback) => {
            TaskController.remove(payload, callback)
        
            return
        })

        socket.on('get-task', (payload, callback) => {
            TaskController.getOne(payload, callback)

            return
        })

        socket.on('create-column', (payload, callback) => {
            ColumnController.create(payload, callback)

            return
        })

        socket.on('update-column', (payload, callback) => {
            ColumnController.update(payload, callback)

            return
        })

        socket.on('remove-column', (payload, callback) => {
            ColumnController.remove(payload, callback)

            return
        })

        socket.on('get-column', (payload, callback) => {
            ColumnController.getOne(payload, callback)
        })
    }
}

module.exports = ConnectionsHandler