const express = require('express');

require('dotenv').config();

const { app, server } = require('./app/socket/index');
const serverMiddleware = require('./app/middlewares/server');
const connectDB = require('./config/connect_db');
const routes = require('./app/routes');

//Middleware server
serverMiddleware.map((x) => x(app));

//Connect database
connectDB.connect();

//Setting routes
routes(app);

app.get('/', (req, res, next) => {
    res.send('Welcome to cloudls ');
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
