window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')
    let getAllButton = document.querySelector('.get-all-button')

    const column1 = '5e655929c5d16d2078c63b91'
    const column2 = '5e6bg929d2116z2078c63b42'
    const column3 = '5e6dgas9c5abba2078c63ba1'

    const handleUpdate = () => {
        socket.emit('update-note', {
            note_id: '5e6dee8f4044f923a0efd1cb',
            content: 'first card updated',
            row_index: 0,
            column_id: column1,
        }, handleUpdateResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('create-note', {
            content: 'first card',
            row_index: 0,
            column_id: column1,
        }, handleAddResponse)

        return
    }

    const handleDelete = () => {
        socket.emit('delete-note', {
            note_id: '5e6dfa055a3a2848f864f15d',
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