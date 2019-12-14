WS = {
    webSocketURITest: 'wss://echo.websocket.org/',
    webSocketURILocal: 'http://localhost:6999',
    socket: null,

    init: function () {
        console.log('WS.init')
        WS.bindEvents()
    },

    bindEvents: function () {
        $('#BTN_TESTCONNECTION').on('click', WS.testConnection)
        $('#BTN_CONNECT').on('click', WS.onConnection)
        $('#BTN_DISCONNECT').on('click', WS.onDisconnection)
        $('#TXT_SEND').on('keypress', WS.onSendTextEnter)
        $('#BTN_SEND').on('click', WS.onSendText)
    },

    testConnection: function (e) {
        console.log('testConnection', e, this)
        WS.onConnection()
        WS.socket.send('test')
        WS.socket.close()
    },

    onConnection: function (e) {
        console.log('onConnection', e, this)
        WS.socket = io.connect(WS.webSocketURILocal)

        /*         WS.s = new WebSocket(WS.webSocketURITest)
                WS.socket.onopen = function (e) { WS.onOpen(e) }
                WS.socket.onclose = function (e) { WS.onClose(e) }
                WS.socket.onmessage = function (e) { WS.onMessage(e) }
                WS.socket.onerror = function (e) { WS.onError(e) }; */

    },

    onDisconnection: function (e) {
        console.log('onDisconnection', e, this)
        WS.socket.disconnect()
    },

    onSendTextEnter: function (e) {
        if (e.keyCode === 13)
            console.log('onSendTextEnter', e, this)
    },

    onSendText: function (e) {
        console.log('onSendText', e, this)
        const name = $('#TXT_NAME').val()
        const txt = $('#TXT_SEND').val()
        const out = $('#OUTPUT').html()
        console.log(WS.socket.connected, name, txt, out)

        // Send the message to the server using the tunnel, "WS.socket" is the socket
        if (WS.socket.connected && name && txt) {
            WS.socket.emit('chat', {
                message: txt,
                handle: name
            })
        }
        else
            console.log('Web Socket is not open')


        // Receiving the information from the server through the socket
        WS.socket.on('chat', function (data) {
            console.log(data)
            $('#OUTPUT').html($.trim(`${out} <div><b>${data.handle}: </b>${data.message}</div>`))

        })

    },

    onOpen: function (e) {
        console.log('WebSocket onOpen', e)
    },

    onClose: function (e) {
        console.log('WebSocket onClose', e)
    },

    onMessage: function (e) {
        console.log('WebSocket onMessage', e)
        // console.log(JSON.parse(e.data))
        console.log(e.data)
    },

    onError: function (e) {
        console.log('WebSocket onError', e)
    }

}