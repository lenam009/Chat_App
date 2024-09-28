const User = require('../models/User');

const bcrypt = require('bcryptjs');

class AuthController {
    async registerUser(req, res, next) {
        try {
            const { name, email, password, profile_pic } = req.body;

            const checkEmail = await User.findOne({ email });

            if (checkEmail) {
                return next({
                    statusCode: 400,
                    message: `Email ${req.body.email} is exists. Please register another email.`,
                    error: 'Bad request',
                });
            }

            // HashPassword
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt).catch(() => null);

            const payload = { name, email, password: hashPassword, profile_pic };

            // Create user
            const userNew = new User(payload);
            const userSave = await userNew.save();

            return res.status(201).json({
                statusCode: 201,
                message: 'Register successfully',
                data: userSave,
            });
        } catch (err) {
            return next({
                statusCode: 500,
                message: err.message || 'registerUser has errors.....',
                error: 'Server error',
            });
        }
    }
}

module.exports = new AuthController();
