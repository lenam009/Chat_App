const express = require('express');
const app = express();
const dotenv = require('dotenv');

const serverMiddleware = require('./app/middlewares/server');

//Middleware server
serverMiddleware.map((x) => x(app));


app.get('/', (req, res, next) => {
    res.send('Welcome to cloudls ');
});

const port = 8080;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
