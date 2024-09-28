const testRoute = require('./testRoute');
const authRoute = require('./authRoute');

function route(app) {
    app.use('/api/test', testRoute);

    app.use('/api/auth', authRoute);
}

module.exports = route;
