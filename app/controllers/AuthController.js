const User = require('../models/User');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var JWTAction = require('../middlewares/JWT.action');

let refreshTokenArray = [];

const generateAccessToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    const access_token = await JWTAction.createJWT(payload, process.env.ACCESS_KEY, '7d').catch((err) => null);

    return access_token;
};

const generateRefreshToken = async (user) => {
    const payload = { _id: user._id, email: user.email };

    const refresh_token = await JWTAction.createJWT(payload, process.env.REFRESH_KEY, '8d').catch((err) => null);

    return refresh_token;
};

class AuthController {
    //POST /auth/register
    async registerUser(req, res, next) {
        try {
            const { name, email, password, profile_pic } = req.body;

            const checkEmail = await User.findOne({ email });

            if (checkEmail) {
                return next({
                    statusCode: 401,
                    message: `Email ${req.body.email} is exists. Please register another email.`,
                    error: 'Unauthorized',
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

    //POST /auth/login
    async login(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
            .then((response) => {
                if (!response)
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Email not correct!',
                        error: 'Unauthorized',
                    });
                return response;
            })
            .catch(() => null);

        if (!user) {
            return next({
                statusCode: 400,
                message: 'Login email failed',
                error: 'Bad request',
            });
        }

        //Check password
        bcrypt
            .compare(req.body.password, user.password)
            .then(async (result) => {
                if (!result)
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Password not correct!',
                        error: 'Unauthorized',
                    });

                const access_token = await generateAccessToken(user);
                const refresh_token = await generateRefreshToken(user);

                console.log('access_token', access_token);

                if (!access_token | !refresh_token) {
                    return next({
                        statusCode: 500,
                        message: 'Create token failed',
                        error: 'Unauthorized',
                    });
                }

                refreshTokenArray.push(refresh_token);

                //Save refresh_token into cookie...
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                    maxAge: 60 * 60 * 1000,
                });

                const { password, ...payloads } = user._doc;
                return res.status(201).json({
                    statusCode: 201,
                    message: 'Login successfully',
                    data: { access_token, user: payloads },
                });
            })
            .catch(() =>
                next({
                    statusCode: 400,
                    message: 'Login password failed',
                    error: 'Bad request',
                }),
            );
    }

    //POST /auth/email
    async checkEmail(req, res, next) {
        const user = await User.findOne({ email: req.body.email })
            .select('-password')
            .catch(() => null);

        if (!user) {
            return next({
                statusCode: 401,
                message: 'Email not correct!',
                error: 'Unauthorized',
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: 'Email verify',
            data: user,
        });
    }

    //POST /auth/password
    async checkPassword(req, res, next) {
        const user = await User.findById(req.body.userId).catch(() => null);

        if (!user) {
            return next({
                statusCode: 400,
                message: 'Login email failed',
                error: 'Unauthorized',
            });
        }

        //Check password
        await bcrypt
            .compare(req.body.password, user.password)
            .then(async (result) => {
                if (!result)
                    return res.status(401).json({
                        statusCode: 401,
                        message: 'Password not correct!',
                        error: 'Unauthorized',
                    });

                const tokenData = { id: user._id, email: user.email };
                const token = await jwt.sign(tokenData, process.env.ACCESS_KEY, { expiresIn: '1d' });

                //Save refresh_token into cookie...
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    path: '/',
                    maxAge: 60 * 60 * 1000,
                });

                return res.status(200).json({
                    statusCode: 200,
                    message: 'Login successfully',
                    token: token,
                });
            })
            .catch(() =>
                next({
                    statusCode: 400,
                    message: 'Login password failed',
                    error: 'Bad request',
                }),
            );
    }

    //GET /auth/logout
    async logout(req, res, next) {
        try {
            res.clearCookie('token');

            return res.status(200).json({
                statusCode: 200,
                message: 'Logout successfully',
            });
        } catch (err) {
            return next({
                statusCode: 500,
                message: err.message || 'logout has errors.....',
                error: 'Server error',
            });
        }
    }
}

module.exports = new AuthController();
