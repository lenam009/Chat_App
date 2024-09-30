var jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUsersDetailFromToken = async (token) => {
    if (!token) {
        return {
            message: 'session out',
            logout: true,
        };
    }

    const decode = await jwt.verify(token, process.env.ACCESS_KEY);

    const user = await User.findById(decode.id).select('-password');

    return user;
};

module.exports = getUsersDetailFromToken;
