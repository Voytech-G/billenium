const TaskController = require('../controller/TaskController')
const ProjectController = require('../controller/ProjectController')
const SubprojectController = require('../controller/SubprojectController')
const ColumnController = require('../controller/ColumnController')
const AuthorizationController = require('../controller/AuthorizationController')
const AuthorizationService = require('../service/AuthorizationService')
const EventService = require('../service/EventService')
const UserController = require('../controller/UserController')

class EventsHandler {
    /**
     * 
     * @param {Function} callback
     * @return {void} 
     */
    static async getCallbackForEventType(socket, callback, eventName) {
        return response => {
            // if event failed (no data to share in given project room) exit
            if (response.status == false) {
                callback(response)
            
                return
            }

            // if event is not meant to be broadcasted exit
            if (EventService.isEventBroadcasted(eventName) == false) {
                callback(response)

                return
            }

            const projectRoom = socket.rooms

            console.log(projectRoom)
            console.log(response)

            callback(response)
        }
    }

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

        EventService.registerEvent(socket, 'update-user', (payload, callback) => {
            UserController.update(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'remove-user', (payload, callback) => {
            UserController.remove(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'get-one-user', (payload, callback) => {
            UserController.getOne(payload, callback)

            return
        }, {
            authenticate: true,
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
            const eventCallback = this.getCallbackForEventType(socket, callback, 'create-subproject')
            SubprojectController.create(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'update-subproject', async (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'update-subproject')
            SubprojectController.update(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'remove-subproject', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'remove-subproject')
            SubprojectController.remove(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'get-one-subproject', (payload, callback) => {
            SubprojectController.getOne(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'subproject-assign-task', (payload, callback) => {
            SubprojectController.assignTask(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'subproject-unassign-task', (payload, callback) => {
            SubprojectController.unassignTask(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'create-task', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'create-task')
            TaskController.create(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'update-task', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'update-task')
            TaskController.update(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'move-task', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'move-task')
            TaskController.move(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'remove-task', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'remove-task')
            TaskController.remove(payload, eventCallback)
        
            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'get-one-task', (payload, callback) => {
            TaskController.getOne(payload, callback)

            return
        }, {
            authenticate: true,
        })

        EventService.registerEvent(socket, 'task-assign-user', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'task-assign-user')
            TaskController.assignUser(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'task-unassign-user', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'task-unassign-user')
            TaskController.unassignUser(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'create-column', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'create-column')
            ColumnController.create(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'update-column', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'update-column')
            ColumnController.update(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'remove-column', (payload, callback) => {
            const eventCallback = this.getCallbackForEventType(socket, callback, 'remove-column')
            ColumnController.remove(payload, eventCallback)

            return
        }, {
            authenticate: true,
            broadcast: true,
        })

        EventService.registerEvent(socket, 'get-column', (payload, callback) => {
            ColumnController.getOne(payload, callback)
        }, {
            authenticate: true,
        })
    }
}

module.exports = EventsHandler