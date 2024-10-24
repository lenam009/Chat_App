const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/user-details', UserController.userDetails);

router.put('/update-user', UserController.updateUserDetails);

router.post('/search-users', UserController.searchUser);

router.use((err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({ service: 'User_Api', ...err });
});

module.exports = router;
