const testRoute = require('./testRoute');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');

function route(app) {
    app.use('/api/test', testRoute);

    app.use('/api/auth', authRoute);

    app.use('/api/user', userRoute);
}

module.exports = route;
