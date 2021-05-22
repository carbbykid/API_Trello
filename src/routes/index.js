const siteRouter = require('./site');
const AuthRoute = require('./auth')

function route(app) {
    app.use('/', siteRouter);
    app.use('/api', AuthRoute)
}

module.exports = route;
