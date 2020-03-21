window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')
    let getAllButton = document.querySelector('.get-all-button')
    let moveButton = document.querySelector('.move-button')
    let testButton = document.querySelector('.test-button')

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

    const handleDelete = () => {
        socket.emit('delete-task', {
            task_id: '5e762e251aa88357e0e8ef14',
            source_row_index: 0,
            source_column_id: column2,
        }, handleDeleteResponse)

        return
    }
                                                   
    const handleTest = () => {
        socket.emit('get-board', handleTestResponse)

        return
    }

    const handleGetAll = () => {
        socket.emit('get-board', handleGetAllResponse)
    }

    addButton.addEventListener('click', handleAdd)
    updateButton.addEventListener('click', handleUpdate)
    deleteButton.addEventListener('click', handleDelete)
    getAllButton.addEventListener('click', handleGetAll)
    moveButton.addEventListener('click', handleMove)
    testButton.addEventListener('click', handleTest)
    
    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)
    
    const handleGetAllResponse = response => { 
        console.log(response)
    }
    
    const handleUpdateResponse = response => {
        console.log(response)
    }

    const handleDeleteResponse = response => {
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
})