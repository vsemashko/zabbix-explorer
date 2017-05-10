module.exports = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
        return res.json(err);
    } else {
        next(err);
    }
};