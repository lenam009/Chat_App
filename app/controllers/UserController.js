const getUsersDetailFromToken = require('../helpers/getUsersDetailFromToken');
const User = require('../models/User');

class UserController {
    async userDetails(req, res, next) {
        try {
            console.log('token', req.cookies);

            const token = req.cookies.token || '';

            const user = await getUsersDetailFromToken(token);

            return res.status(200).json({
                statusCode: 200,
                message: 'userDetails successfully',
                data: user,
            });
        } catch (err) {
            return next({
                statusCode: 500,
                message: err.message || 'userDetails has errors.....',
                error: 'Server error',
            });
        }
    }
}

module.exports = new UserController();
