let sockets = {}
let connected = 0

module.exports = (socket) => {
    let interval
    if (socket.id != null) {
        var userId = ++connected
        socket.user = socket.id
        console.log(`[!] connected socket: ${socket.id}`)
        sockets[userId] = socket
    }

    if (interval) {
        clearInterval(interval)
    }

    socket.om("msg", (data) => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log(`[!] Socket Disconnected`)
        var user = socket.user
        console.log(user)
        if (!user) return

        delete sockets[user]
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}
