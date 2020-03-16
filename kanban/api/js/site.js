window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')
    let getAllButton = document.querySelector('.get-all-button')

    const column1 = '5e6a939ce5ad082e20db27f9'
    const column2 = '5e6a947739c8ce2ef4562fcd'
    const column3 = '5e6a9498c703912320a4ab87'
    const column4 = '5e6a94a92e137b25f0196cc9'

    const handleUpdate = () => {
        socket.emit('update-note', {
            note_id: '5e6fdd6ecbcfaf0ac8e6636c',
            content: '3card',
            target_row_index: 0,
            target_column_id: column1,
            source_row_index: 2,
            source_column_id: column1,
        }, handleUpdateResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('create-note', {
            content: '4card',
            row_index: 0,
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
})