const getUsersDetailFromToken = require('../helpers/getUsersDetailFromToken');
const User = require('../models/User');

class UserController {
    //GET_user-details
    async userDetails(req, res, next) {
        try {
            // console.log('token', req.cookies);

            const token = req.cookies.token || '';

            const user = await getUsersDetailFromToken(token);

            if (user.statusCode && user.statusCode != 200)
                return res.status(400).json({
                    statusCode: 400,
                    message: 'session out',
                    logout: true,
                    error: 'session out',
                });

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

    async updateUserDetails(req, res, next) {
        try {
            // console.log('token', req.cookies);

            const token = req.cookies.token || '';

            const user = await getUsersDetailFromToken(token);

            if (user.statusCode && user.statusCode != 200) return res.status(200).json(user);

            const { name, profile_pic } = req.body;

            // update user
            const updateUser = await User.updateOne({ _id: user._id }, { name, profile_pic }).catch(() =>
                next({
                    statusCode: 400,
                    message: err.message || 'updateUserDetails has errors.....',
                    error: 'Update failed',
                }),
            );

            const userInformation = await User.findById(user._id);

            return res.status(200).json({
                statusCode: 200,
                message: 'updateUserDetails successfully',
                data: userInformation,
            });
        } catch (err) {
            return next({
                statusCode: 500,
                message: err.message || 'updateUserDetails has errors.....',
                error: 'Server error',
            });
        }
    }
}

module.exports = new UserController();
