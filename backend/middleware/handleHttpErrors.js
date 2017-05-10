const HttpError = require('error').HttpError;

module.exports = (err, req, res, next) => {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError || err.name === 'HttpError' || err.name === 'UnauthorizedError') {
        res.status(err.status);
        return res.json(err);
        //next();
    } else {
        next(err);
    }
};