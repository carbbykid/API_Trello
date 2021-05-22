var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var passport = require('passport');
var cookieSession = require('cookie-session')

var logger = require('morgan');
const debugHttp = require('debug')('myw-api:http');
var createError = require('http-errors');

const route = require('./routes');
require('./passport-setup');

const databaseConnection = require('./configs/database');

var app = express();

databaseConnection.connect();

app.use(cors());
app.use(
    logger('dev', {
        stream: {
            write: (msg) => debugHttp(msg.trimEnd()),
        },
    }),
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'trello-session',
    keys: ['key1', 'key2']
  }))
app.use(passport.initialize());
app.use(passport.session());

route(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;
