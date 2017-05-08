const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('models/user').User;
const _ = require('lodash');
const HttpError = require('error').HttpError;
const AuthError = require('models/user').AuthError;
const async = require('async');

const app = module.exports = express.Router();

function createToken(user) {
    return jwt.sign(_.omit(user, ['password', 'hashedPassword', 'salt']), config.get('secret'), {expiresIn: '1d'});
}

app.post('/users', function (req, res) {
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
});

app.post('/sessions/create', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        res.status(201).send({
            id_token: createToken(user.toObject())
        });
    });
});
