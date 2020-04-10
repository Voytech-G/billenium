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
    let signUpButton = document.querySelector('.sign-up-button')
    let signInButton = document.querySelector('.sign-in-button')

    const handleUpdate = () => {
        socket.emit('update-task', {
            task_id: '5e90e0a46d98d833703affc2',
            content: '3task updated 4',
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
            column_id: '5e90e06f6d98d833703affbf',
            content: '3task',
            row_index: 2,
        }, handleAddResponse)

        return
    }

    const handleRemove = () => {
        socket.emit('remove-task', {
            task_id: '5e90e09e6d98d833703affc1',
            source_row_index: 1,
            source_column_id: '5e90e06f6d98d833703affbf',
        }, handleRemoveResponse)

        return
    }
                                                   
    const handleTest = () => {
        socket.emit('update-column', {
            column_id: '5e90e55b37576257647302d8',
            name: 'col2 update 2',
            board_index: 1,
            max_tasks: 222,
        }, handleTestResponse)

        // socket.emit('create-column', {
        //     project_id: '5e90df5a6d98d833703affbc',
        //     name: 'col2',
        //     board_index: 1,
        //     max_tasks: 5,
        // }, handleTestResponse)

        // socket.emit('get-column', {
        //     column_id: '5e86275b61fac5245c8c5f0c',
        // }, handleTestResponse)

        // socket.emit('get-task', {
        //     task_id: '5e80fa3b5df30509884abe7a',
        // }, handleTestResponse)

        return
    }

    const handleGetAll = () => {
        socket.emit('get-all-projects', handleGetAllResponse)

        // socket.emit('get-project', {
        //     project_id: '5e877170c2386013906d7421',
        // }, handleGetAllResponse)
    }

    const handleRemoveColumn = () => {
        socket.emit('remove-column', {
            column_id: '5e90dfb06d98d833703affbd',
        }, handleRemoveColumnResponse)
    }

    const handleAddProject = () => {
        socket.emit('create-project', {
            project_name: 'Project 1',
            total_budget: '55600',
        }, handleAddProjectResponse)
    }

    const handleUpdateProject = () => {
        socket.emit('update-project', {
            project_id: '5e90df5a6d98d833703affbc',
            project_name: 'tt update 1',
            used_budget: 150,
            total_budget: 500,
        }, handleUpdateProjectResponse)
    }

    const handleRemoveProject = () => {
        socket.emit('remove-project', {
            project_id: '5e850799c360416dbc1c6305',
        }, handleRemoveProjectReponse)
    }

    const handleSignIn = () => {
        const username = document.querySelector('.username-field-login').value
        const pin = document.querySelector('.pin-field-login').value

        socket.emit('sign-in', {
            username,
            pin,
        }, handleSignInResponse)

        return
    }

    const handleSignUp = () => {
        const username = document.querySelector('.username-field').value
        const pin = document.querySelector('.pin-field').value
        const firstName = document.querySelector('.first-name-field').value
        const lastName = document.querySelector('.last-name-field').value
        const userType = document.querySelector('.user-type-field').value

        socket.emit('sign-up', {
            username,
            pin,
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
        }, handleSignUpResponse)
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
    signUpButton.addEventListener('click', handleSignUp)
    signInButton.addEventListener('click', handleSignIn)
    
    const SERVER_URL = 'http://localhost:4000'
    let token = localStorage.getItem('token')

    console.log(token)
    
    let socket = io.connect(SERVER_URL, {
        // query: { token }
    })

    socket.emit('authenticate', {
        token,
    }, response => {
        console.log(response)
    })

    socket.on('error', error => {
        console.log(error)
    })
    
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

    const handleSignUpResponse = response => {
        console.log(response)
    }

    const handleSignInResponse = response => {
        const token = response.payload

        localStorage.setItem('token', token)
    }
})