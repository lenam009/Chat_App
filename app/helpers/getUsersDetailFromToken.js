var jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUsersDetailFromToken = async (token) => {
    try {
        if (!token) {
            return {
                statusCode: 400,
                message: 'session out',
                logout: true,
                error: 'getUsersDetailFromToken error',
            };
        }

        const decode = await jwt.verify(token, process.env.ACCESS_KEY);

        const user = await User.findById(decode.id)
            .select('-password')
            .catch(() => null);

        return user;
    } catch (err) {
        return {
            statusCode: 400,
            message: 'user invalid',
            logout: true,
            error: 'getUsersDetailFromToken error',
        };
    }
};

module.exports = getUsersDetailFromToken;
