const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.registerUser);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Auth_Api', ...err });
});

module.exports = router;
