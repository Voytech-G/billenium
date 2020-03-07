window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let deleteButton = document.querySelector('.delete-button')

    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)

    const handleUpdateResponse = response => {
        console.log(response)
    }

    const handleDeleteResponse = response => {
        console.log(response)
    }

    const handleAddResponse = response => {
        console.log(response)
    }

    const handleUpdate = () => {
        socket.emit('update-note', {
            note_id: '5e640fb2229e3668e850959c',
            content: 'updated fourth new note 2',
            row_index: 5,
            column_id: 5,
        }, handleUpdateResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('add-note', {
            content: 'new note 2',
            row_index: 1,
            column_id: 0,
        }, handleAddResponse)

        return
    }

    const handleDelete = () => {
        socket.emit('delete-note', {
            note_id: '5e640fc8229e3668e850959d',
        }, handleDeleteResponse)
        
        return
    }

    addButton.addEventListener('click', handleAdd)
    updateButton.addEventListener('click', handleUpdate)
    deleteButton.addEventListener('click', handleDelete)
})