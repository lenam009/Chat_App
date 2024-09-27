const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

router.get('/', (req, res) => { return res.status(200).json("hello") });

module.exports = router;
