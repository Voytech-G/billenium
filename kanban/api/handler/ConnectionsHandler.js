const TaskController = require('../controller/TaskController')
const ConnectionsService = require('../service/ConnectionsService') 
const ProjectController = require('../controller/ProjectController')
const ColumnController = require('../controller/ColumnController')

class ConnectionsHandler {
    /**
     * ConnectionsHandler constructor
     */
    constructor() {
        this.connectionsService = new ConnectionsService()
    }

    /**
     * Setup a socket.io connection, register events
     * 
     * @param {Object} socket
     * @return {void} 
     */
    async setupConnection(socket) {
        console.log(`Socket of ID: ${socket.id} has just connected`);
        this.addConnection(socket)
        
        // method run every incoming event
        socket.use((payload, next) => {
            this.connectionsService.handleIncomingEvent(payload, next)

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

    /**
     * Register new connection
     * 
     * @param {Object} socket 
     * @return {void}
     */
    addConnection(socket) {
        // add new socket connection
        this.connectionsService.addConnection(socket)

        this.connectionsService.showConnections()

        return
    }
}

module.exports = new ConnectionsHandler()