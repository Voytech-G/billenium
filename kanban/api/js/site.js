window.onload = (function() {
    let addButton = document.querySelector('.add-button')
    let updateButton = document.querySelector('.update-button')
    let removeButton = document.querySelector('.remove-button')
    let getAllButton = document.querySelector('.get-all-button')
    let moveButton = document.querySelector('.move-button')
    let testButton = document.querySelector('.test-button')
    let removeColumnButton = document.querySelector('.remove-column-button')
    let addProjectButton = document.querySelector('.add-project-button')
    let updateProjectButton = document.querySelector('.update-project-button')
    let removeProjectButton = document.querySelector('.remove-project-button')

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
            target_column_id: '5e760791c3dd0d47a850fa70',
            source_row_index: 2,
            source_column_id: '5e760791c3dd0d47a850fa70',
        }, handleMoveResponse)

        return
    }

    const handleAdd = () => {
        socket.emit('create-task', {
            column_id: '5e86275b61fac5245c8c5f0c',
            content: '3task',
            row_index: 2,
        }, handleAddResponse)

        return
    }

    const handleRemove = () => {
        socket.emit('remove-task', {
            task_id: '5e8508f58dc804281c58f669',
            source_row_index: 2,
            source_column_id: '5e8507b3c360416dbc1c6306',
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

        // socket.emit('create-column', {
        //     project_id: '5e850799c360416dbc1c6305',
        //     name: 'col1',
        //     board_index: 0,
        //     max_tasks: 5,
        // }, handleTestResponse)

        socket.emit('get-column', {
            column_id: '5e86275b61fac5245c8c5f0c',
        }, handleTestResponse)

        // socket.emit('get-task', {
        //     task_id: '5e80fa3b5df30509884abe7a',
        // }, handleTestResponse)

        return
    }

    const handleGetAll = () => {
        socket.emit('get-project', {
            project_id: '5e850799c360416dbc1c6305',
        }, handleGetAllResponse)
    }

    const handleRemoveColumn = () => {
        socket.emit('remove-column', {
            column_id: '5e85060e78841b24ccc2fd6a'
        }, handleRemoveColumnResponse)
    }

    const handleAddProject = () => {
        socket.emit('create-project', {
            project_name: 'Project 1',
            total_budget: '500',
        }, handleAddProjectResponse)
    }

    const handleUpdateProject = () => {
        socket.emit('update-project', {
            project_id: '5e8384a3c1ebd573c0346e5b',
            project_name: 'Test update 2',
            used_budget: 150,
            total_budget: 500,

        }, handleUpdateProjectResponse)
    }

    const handleRemoveProject = () => {
        socket.emit('remove-project', {
            project_id: '5e850799c360416dbc1c6305',
        }, handleRemoveProjectReponse)
    }

    addButton.addEventListener('click', handleAdd)
    updateButton.addEventListener('click', handleUpdate)
    removeButton.addEventListener('click', handleRemove)
    getAllButton.addEventListener('click', handleGetAll)
    moveButton.addEventListener('click', handleMove)
    testButton.addEventListener('click', handleTest)
    removeColumnButton.addEventListener('click', handleRemoveColumn)
    addProjectButton.addEventListener('click', handleAddProject)
    updateProjectButton.addEventListener('click', handleUpdateProject)
    removeProjectButton.addEventListener('click', handleRemoveProject)
    
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

    const handleAddProjectResponse = response => {
        console.log(response)
    }

    const handleUpdateProjectResponse = response => {
        console.log(response)
    }

    const handleRemoveProjectReponse = response => {
        console.log(response)
    }

})