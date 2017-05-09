const HttpError = require('error').HttpError;

module.exports = (err, req, res, next) => {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError || err.name === 'HttpError') {
        res.status(err.status);
        res.json(err);
        next();
    } else {
        next(err);
    }
};