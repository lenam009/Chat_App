const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const getUsersDetailFromToken = require('../helpers/getUsersDetailFromToken');
const User = require('../models/User');
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

    // Create a room
    socket.join(user?._id);
    onlineUser.add(user?._id?.toString());

    // console.log('connect', socket.id);

    io.emit('onlineUser', Array.from(onlineUser));

    socket.on('message-page', async (userId) => {
        const userDetail = await User.findById(userId)
            .select('-password')
            .catch(() => null);

        const payload = {
            _id: userDetail?._id,
            name: userDetail?.name,
            email: userDetail?.email,
            profile_pic: userDetail?.profile_pic,
            online: onlineUser.has(userId),
        };

        // console.log('payload');

        socket.emit('message-user', payload);
    });

    /**Disconnect */
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id);
        // console.log('Disconnect user', socket.id);
    });
});

module.exports = {
    app,
    server,
};
