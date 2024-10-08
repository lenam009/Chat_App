var jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUsersDetailFromToken = async (token) => {
    if (!token) {
        return {
            statusCode: 400,
            message: 'session out',
            logout: true,
            error: 'session out',
        };
    }

    const decode = await jwt.verify(token, process.env.ACCESS_KEY);

    const user = await User.findById(decode.id).select('-password');

    return user;
};

module.exports = getUsersDetailFromToken;