const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

router.get("/", (req, res) => {
    return res.status(200).json("hello");
});

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: "Test_Api", ...err });
});

module.exports = router;
