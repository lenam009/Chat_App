const express = require('express');
const app = express();

require('dotenv').config()

const serverMiddleware = require('./app/middlewares/server');
const connect_db = require('./config/connect_db');
const routes = require('./app/routes');

//Middleware server
serverMiddleware.map((x) => x(app));

//Connect database
connect_db.connect();

//Setting routes
routes(app);


app.get('/', (req, res, next) => {
    res.send('Welcome to cloudls ');
});

const port = 8080;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
