window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')

    const handleUpdate = () => {
        socket.emit('update-note', {
            note_id: '5e6422e02ecbd12d98ef4a44',
            content: 'haloa',
            row_index: 1,
            column_id: 5,
        }, handleUpdateResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('add-note', {
            content: 'new note new',
            row_index: 1,
            column_id: 1,
        }, handleAddResponse)

        return
    }

    const handleDelete = () => {
        socket.emit('delete-note', {
            note_id: '5e6422e02ecbd12d91ef4a44',
        }, handleDeleteResponse)

        return
    }

    addButton.addEventListener('click', handleAdd)
    updateButton.addEventListener('click', handleUpdate)
    deleteButton.addEventListener('click', handleDelete)
    
    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)
    
    const handleBoard = board => { 
        console.log(board)
    }
    
    socket.on('board', handleBoard)

    const handleUpdateResponse = response => {
        console.log(response)
    }

    const handleDeleteResponse = response => {
        console.log(response)
    }

    const handleAddResponse = response => {
        console.log(response)
    }
})