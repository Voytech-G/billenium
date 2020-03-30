window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let removeButton = document.querySelector('.remove-button')
    let getAllButton = document.querySelector('.get-all-button')
    let moveButton = document.querySelector('.move-button')
    let testButton = document.querySelector('.test-button')
    let removeColumnButton = document.querySelector('.remove-column-button')

    const column1 = '5e7617a72c0df71c482647cb'
    const column2 = '5e7618bef4416f47802498df'
    const invalidColumn = '5e7618bef4452f47802498df'

    const handleUpdate = () => {
        socket.emit('update-task', {
            task_id: '5e760791c3dd0d47a850fa70',
            content: '2card updated xx',
        }, handleUpdateResponse)

        return
    }

    const handleMove = () => {
        socket.emit('move-task', {
            task_id: '5e7272b551979e3accfd9e70',
            target_row_index: 0,
            target_column_id: column1,
            source_row_index: 2,
            source_column_id: column1,
        }, handleMoveResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('create-task', {
            content: '3task',
            row_index: 0,
            column_id: column2,
        }, handleAddResponse)

        return
    }

    const handleRemove = () => {
        socket.emit('remove-task', {
            task_id: '5e762e251aa88357e0e8ef14',
            source_row_index: 0,
            source_column_id: column2,
        }, handleRemoveResponse)

        return
    }
                                                   
    const handleTest = () => {
        // socket.emit('update-column', {
        //     column_id: '5e7d073d2c5bc5316893611c',
        //     name: 'col1 update update update pls',
        //     board_index: 3,
        //     max_tasks: 15,
        // }, handleTestResponse)

        socket.emit('create-column', {
            name: 'col4',
            board_index: 3,
            max_tasks: 5,
        }, handleTestResponse)

        // socket.emit('get-column', {
        //     column_id: '5e7fc0194e91c44688d952fb',
        // }, handleTestResponse)

        // socket.emit('get-task', {
        //     task_id: '5e80fa3b5df30509884abe7a',
        // }, handleTestResponse)

        return
    }

    const handleGetAll = () => {
        socket.emit('get-project', handleGetAllResponse)
    }

    const handleRemoveColumn = () => {
        socket.emit('remove-column', {
            column_id: '5e7fc0194e91c44688d952fb'
        }, handleRemoveColumnResponse)
    }

    addButton.addEventListener('click', handleAdd)
    updateButton.addEventListener('click', handleUpdate)
    removeButton.addEventListener('click', handleRemove)
    getAllButton.addEventListener('click', handleGetAll)
    moveButton.addEventListener('click', handleMove)
    testButton.addEventListener('click', handleTest)
    removeColumnButton.addEventListener('click', handleRemoveColumn)

    
    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)
    
    const handleGetAllResponse = response => { 
        console.log(response)
    }
    
    const handleUpdateResponse = response => {
        console.log(response)
    }

    const handleRemoveResponse = response => {
        console.log(response)
    }

    const handleAddResponse = response => {
        console.log(response)
    }

    const handleMoveResponse = response => {
        console.log(response)
    }

    const handleTestResponse = response => {
        console.log(response)
    }

    const handleRemoveColumnResponse = response => {
        console.log(response)
    }
})