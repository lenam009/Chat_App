const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.registerUser);

router.post('/login', AuthController.login);

router.post('/email', AuthController.checkEmail);

router.post('/password', AuthController.checkPassword);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'Auth_Api', ...err });
});

module.exports = router;
