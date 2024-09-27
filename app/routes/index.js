const testRouter = require("./test")

function route(app) {

    app.use('/api/test', testRouter)

}

module.exports = route;