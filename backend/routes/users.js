const User = require('models/user').User;
const HttpError = require('error').HttpError;
const AuthError = require('models/user').AuthError;

exports.post = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    User.createUser(username, password, function (err, userToken) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        res.status(201).send({
            id_token: userToken
        });
    });
};
