const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const config = require('config');
const bodyParser = require('body-parser');
const HttpError = require('error').HttpError;

const app = express();

app.use(logger('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }

});

if (process.env.NODE_ENV === 'development') {
    app.use(express.logger('dev'));
    app.use(errorhandler())
}

app.use(require('middleware/sendHttpError'));

app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));

http.createServer(app).listen(config.get('port'), function (err) {
    console.log('listening in http://localhost:' + config.get('port'));
});

