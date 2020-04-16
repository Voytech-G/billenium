const TaskController = require('../controller/TaskController')
const ProjectController = require('../controller/ProjectController')
const SubprojectController = require('../controller/SubprojectController')
const ColumnController = require('../controller/ColumnController')
const AuthorizationController = require('../controller/AuthorizationController')
const AuthorizationService = require('../service/AuthorizationService')
const EventService = require('../service/EventService')

class EventsHandler {
    /**
     * Setup a socket.io connection, register events
     * 
     * @param {Object} socket
     * @return {void} 
     */
    static async setupEvents(socket) {
        console.log(`Socket of ID: ${socket.id} has just connected`);

        EventService.registerMiddleware(socket, (payload, next) => {
            AuthorizationService.authenticateEvent(socket, payload, next)
        })

        EventService.registerMiddleware(socket, (payload, next) => {
            AuthorizationService.authorizeEvent(socket, payload, next)
        })

        EventService.registerEvent(socket, 'authenticate', (payload, callback) => {
            AuthorizationController.authenticate(socket, payload, callback)

            return
        }, {
            authenticate: false,
        })

        EventService.registerEvent(socket, 'sign-up', (payload, callback) => {
            AuthorizationController.signUp(payload, callback)

            return
        }, {
            authenticate: false,
        })

        EventService.registerEvent(socket, 'sign-in', (payload, callback) => {
            AuthorizationController.signIn(socket, payload, callback)

            return
        }, {
            authenticate: false,
        })

        EventService.registerEvent(socket, 'create-project', (payload, callback) => {
            ProjectController.create(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'update-project', (payload, callback) => {
            ProjectController.update(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'remove-project', (payload, callback) => {
            ProjectController.remove(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'get-project', (payload, callback) => {
            ProjectController.getOne(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'get-all-projects', callback => {
            ProjectController.getAll(callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'create-subproject', (payload, callback) => {
            SubprojectController.create(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'create-task', (payload, callback) => {
            TaskController.create(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'update-task', (payload, callback) => {
            TaskController.update(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'move-task', (payload, callback) => {
            TaskController.move(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'remove-task', (payload, callback) => {
            TaskController.remove(payload, callback)
        
            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'get-task', (payload, callback) => {
            TaskController.getOne(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'create-column', (payload, callback) => {
            ColumnController.create(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'update-column', (payload, callback) => {
            ColumnController.update(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'remove-column', (payload, callback) => {
            ColumnController.remove(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'get-column', (payload, callback) => {
            ColumnController.getOne(payload, callback)
        }, {
            authenticate: true,
        })
    }
}

module.exports = EventsHandler