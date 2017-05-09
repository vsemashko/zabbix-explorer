const crypto = require('crypto');
const async = require('async');
const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('config');
const _ = require('lodash');

const mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword; });


schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (username, password, callback) {
    let User = this;

    if (!username || !password) {
        callback(new AuthError('Username and password should be provided'))
    }

    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (user && (user.checkPassword(password))) {
                callback(null, User.createToken(user));
            } else {
                callback(new AuthError('Username or password is incorrect'));
            }
        }
    ], callback);
};

schema.statics.createUser = function (username, password, callback) {
    let User = this;

    if (!username || !password) {
        callback(new AuthError('Username and password should be provided'))
    }

    async.waterfall([
        (callback) => {
            User.findOne({username: username}, callback);
        },
        (user, callback) => {
            if (user) return callback(new AuthError('User already exist'));

            user = new User({username, password});
            user.save(callback);
        },
        (user) => {
            console.log(user);
            callback(null, User.createToken(user));
        }
    ], callback);
};

/*app.post('/users', function (req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return next(err);
        if (user) return res.status(400).send("A user with that username already exists");

        user = new mongoose.models.User(_.pick(req.body, 'username', 'password', 'extra'));
        user.save((err, user) => {
            if (err) return next(err);

            res.status(201).send({
                id_token: createToken(user.toObject())
            });
        });
    });
});*/

schema.statics.createToken = (user) => {
    return jwt.sign(_.omit(user.toObject(), ['hashedPassword', 'salt']), config.get('secret'), {expiresIn: '1d'});
};

exports.User = mongoose.model('User', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
