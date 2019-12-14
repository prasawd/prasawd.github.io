const express = require('express')
const socket = require('socket.io')

const app = express().use(express.static('./public'))

var server = app.listen(6999, function () {
    console.log('Server is listening on -> 6999')
})

const io = socket(server)
io
    .on('connection', function (socket) {
        console.log('Socket Connected', socket.id)

        // Handle chat event
        socket.on('chat', function (data) {
            console.log(data)
            io.sockets.emit('chat', data)
            // socket.emit('chat', data) // to send the message to only the sent client
        })

        // Handle typing event
        socket.on('typing', function (data) {
            socket.broadcast.emit('typing', data);
        });

        // Handle disconnect event
        socket.on('disconnect', function () {
            console.log('Socket Disonnected', socket.id)

        })
    })
