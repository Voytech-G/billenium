class EventService {
    // list of events that will not be authenticated
    static AUTHENTICATED_EVENTS = []

    // list of events that will be broadcasted to all users in given project room
    static BROADCASTED_EVENTS = []

    /**
     * Check if given event name is registered as authenticated
     * 
     * @param {String} eventName
     * @return {boolean} true, if event should be authenticated 
     */
    static isEventAuthenticated(eventName) {
        try {
            return this.AUTHENTICATED_EVENTS.includes(eventName)
        } catch (exception) {
            throw new Error(`Failed to check if event type should be authenticated: ${exception.message}`)
        }
    }

    /**
     * Check if given event name is registered as broadcasted event.
     * If yes, broadcast result of given event to all sockets currently connected
     * to given project room.
     * 
     * @param {String} eventName
     * @return {boolean} 
     */
    static isEventBroadcasted(eventName) {
        try {
            return this.BROADCASTED_EVENTS.includes(eventName)
        } catch (exception) {
            throw new Error(`Failed to check if event type should be broadcasted: ${exception.message}`)
        }
    }

    /**
     * Register middleware
     * 
     * @param {Object} socket 
     * @param {Function} middleware 
     * @return {void}
     */
    static registerMiddleware(socket, middleware) {
        try {
            socket.use(middleware)
        } catch (exception) {
            throw new Error(`Failed to register a middleware: ${exception.message}`)
        }
    }

    /**
     * Register new event of given name, handling method and with specified options
     * 
     * @param {String} eventName 
     * @param {Function} handler 
     * @param {Object} options
     * @return {void} 
     */
    static registerEvent(socket, eventName, handler, options) {
        try {
            socket.on(eventName, handler)
    
            this.handleEventOptions(eventName, options)
    
            return
        } catch (exception) {
            throw new Error(`Failed to register an event: ${exception.message}`)
        }
    }

    /**
     * Handle registered event options
     * 
     * @param {String} eventName
     * @param {Object} options
     * @return {void} 
     */
    static handleEventOptions(eventName, options) {
        const authenticate = options.authenticate
        if (authenticate != null && authenticate == true) {
            this.AUTHENTICATED_EVENTS.push(eventName)
        }

        const broadcast = options.broadcast
        if (broadcast != null && broadcast == true) {
            this.BROADCASTED_EVENTS.push(eventName)
        }
    }
}

module.exports = EventService