window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')
    let getAllButton = document.querySelector('.get-all-button')
    let moveButton = document.querySelector('.move-button')

    const column1 = '5e6a939ce5ad082e20db27f9'
    const column2 = '5e6a947739c8ce2ef4562fcd'

    const handleUpdate = () => {
        socket.emit('update-task', {
            task_id: '5e75d68ecdd8b706f44ad574',
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
            content: '1card',
            row_index: 0,
            column_id: column1,
        }, handleAddResponse)

        return
    }

    const handleDelete = () => {
        socket.emit('delete-task', {
            task_id: '5e75d68ecdd8b706f44ad574',
            source_row_index: 1,
            source_column_id: column1,
        }, handleDeleteResponse)

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
})