window.onload = (function() {
    let button = document.querySelector('.send-button')
    let input = document.querySelector('.send-input')

    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)

    const handleClick = () => {
        let content = input.value
        let rowIndex = 1
        let columnIndex = 1

        socket.emit('update-note', {
            note_id: '5e6002c7e2a5373178827cc4',
            content,
            row_index: rowIndex,
            column_index: columnIndex,
        })
    }

    button.addEventListener('click', handleClick)
})