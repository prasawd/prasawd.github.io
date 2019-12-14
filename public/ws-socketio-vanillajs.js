var socket = null

// Query DOM
var btnConnect = document.getElementById('BTN_CONNECT'),
    btnDisconnect = document.getElementById('BTN_DISCONNECT'),
    message = document.getElementById('TXT_SEND'),
    handle = document.getElementById('TXT_NAME'),
    btnSend = document.getElementById('BTN_SEND'),
    output = document.getElementById('OUTPUT'),
    feedback = document.getElementById('SIGNAL');

// Emit events

btnConnect.addEventListener('click', function () {
    console.log('connect')

    // Make connection
    socket = io.connect('http://localhost:6999');

    // Listen for events after creating the connection
    socket.on('chat', function (data) {
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    });

    socket.on('typing', function (data) {
        feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });

})

btnDisconnect.addEventListener('click', function () {
    console.log('disconnect')
    socket.close()
})

btnSend.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})

