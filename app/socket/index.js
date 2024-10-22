const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getUsersDetailFromToken = require('../helpers/getUsersDetailFromToken');
const app = express();

/** Socket connection */
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
});

/** Socket is running at http://localhost:8080 */

// Online user
const onlineUser = new Set();

io.on('connection', async (socket) => {
    const token = socket.handshake.auth.token;

    // Current user
    const user = await getUsersDetailFromToken(token);

    // console.log('Connection user', socket.id, user);

    // Create a room
    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit('onlineUser', Array.from(onlineUser));

    /**Disconnect */
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
        console.log('Disconnect user', socket.id);
    });
});

module.exports = {
    app,
    server,
};
