const express = require('express');
const { Server } = require('socket.io');
const { http } = require('http');
const app = express();

/** Socket connection */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
});

io.on('connection', (socket) => {
    console.log('Connect user', socket.id);

    /**Disconnect */
    io.on('disconnect', () => {
        console.log('Disconnect user', socket.id);
    });
});

module.exports = {
    app,
    server,
};
