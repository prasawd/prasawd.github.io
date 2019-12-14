WS = {
    webSocketURITest: 'wss://echo.websocket.org/',
    s: null,

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
        WS.s.send('test')
        WS.s.close()
    },

    onConnection: function (e) {
        console.log('onConnection', e, this)
        WS.s = new WebSocket(WS.webSocketURITest)
        WS.s.onopen = function (e) { WS.onOpen(e) }
        WS.s.onclose = function (e) { WS.onClose(e) }
        WS.s.onmessage = function (e) { WS.onMessage(e) }
        WS.s.onerror = function (e) { WS.onError(e) };

    },

    onDisconnection: function (e) {
        console.log('onDisconnection', e, this)
        WS.s.close()
    },

    onSendTextEnter: function (e) {
        if (e.keyCode === 13)
            console.log('onSendTextEnter', e, this)
    },

    onSendText: function (e) {
        console.log('onSendText', e, this)
        const txt = $('#TXT_SEND').val()
        if (WS.s && txt)
            WS.s.send(txt)
        else
            console.log('Web Socket is not open')
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