const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Enable CORS Policy
const corsPolicy = (app) => {
    const corsOptions = {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    };

    app.use(cors(corsOptions));

    // app.use(function (req, res, next) {
    //     res.header("Content-Type", "application/json;charset=UTF-8");
    //     res.header("Access-Control-Allow-Credentials", true);
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //     // res.header('Access-Control-Allow-Origin', '*');
    //     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    //     res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

    //     next();
    // });
};

//Parser json
const jsonParser = (app) => {
    app.use(express.json());
};

//(form html post len server (x-wwww-form-urlencoded) )
const postHtml = (app) => {
    app.use(
        express.urlencoded({
            extended: true,
        }),
    );
};

//Cookie parser
const cookie = (app) => {
    app.use(cookieParser());
};

const serverMiddleware = [corsPolicy, jsonParser, postHtml, cookie];

module.exports = serverMiddleware;
