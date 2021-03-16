import Echo from 'laravel-echo'

window.io = require('socket.io-client')
window.Pusher = require('socket.io-client')

let echoOptions = {
    broadcaster: 'socket.io',
    auth: {
        headers: {
            authHost: window.location.origin
        }

    },
    transports: ["polling"]
}

if (document.head.querySelector('meta[name="host"]') !== null) {
    echoOptions.host = document.head.querySelector('meta[name="schema"]').content + '://' +
        document.head.querySelector('meta[name="host"]').content
}


if (document.head.querySelector('meta[name="auth_endpoint"]') !== null) {
    echoOptions.auth.headers.authEndpoint = document.head.querySelector('meta[name="auth_endpoint"]').content
}

if (document.head.querySelector('meta[name="token"]') !== null) {
    echoOptions.auth.headers.Authorization = 'Bearer ' + document.head.querySelector('meta[name="token"]').content
}

window.Echo = new Echo(echoOptions)

let userReceivesBroadcastOn = document.head.querySelector('meta[name="user_private_channel"]').content

if (userReceivesBroadcastOn !== null) {
    window.userPrivateChannel = window.Echo.private(userReceivesBroadcastOn)
}
