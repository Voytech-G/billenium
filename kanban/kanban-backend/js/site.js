window.onload = (function() {
    let button = document.querySelector('.send-button')
    let input = document.querySelector('.send-input')

    const SERVER_URL = 'http://localhost:4000'
    let socket = io(SERVER_URL)

    const handleClick = () => {
        // get note content
        let content = input.value

        socket.emit('new-note', { content })
    }

    button.addEventListener('click', handleClick)
})