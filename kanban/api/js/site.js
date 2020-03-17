window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')
    let getAllButton = document.querySelector('.get-all-button')
    let moveButton = document.querySelector('.move-button')

    const column1 = '5e6a939ce5ad082e20db27f9'
    const column2 = '5e6a947739c8ce2ef4562fcd'

    const handleUpdate = () => {
        socket.emit('update-note', {
            note_id: '5e714418555f8f30a4ed742d',
            content: '2card updated',
        }, handleUpdateResponse)

        return
    }

    const handleMove = () => {
        socket.emit('move-note', {
            note_id: '5e71440e404187419c79fcb3',
            target_row_index: 2,
            target_column_id: column1,
            source_row_index: 3,
            source_column_id: column1,
        }, handleMoveResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('create-note', {
            content: '9card',
            row_index: 1,
            column_id: column2,
        }, handleAddResponse)

        return
    }

    const handleDelete = () => {
        socket.emit('delete-note', {
            note_id: '5e6e2faf13f52f16d0d6f283',
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