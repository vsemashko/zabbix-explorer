const async = require('async');
const util = require('util');
const config = require('config');
const _ = require('lodash');
const HttpError = require('error').HttpError;

const mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.createEmail = function (newEmail, callback) {
    let MailingList = this;

    if (!newEmail) {
        callback(new HttpError(400, 'Email should be provided'))
    }

    async.waterfall([
        (callback) => {
            MailingList.findOne(newEmail, callback);
        },
        (email, callback) => {
            if (email) return callback(new HttpError(400, 'Email already exist'));

            email = new MailingList(newEmail);
            email.save(callback);
        },
        (email) => {
            callback(null, email);
        }
    ], callback);
};

schema.statics.updateEmail = function (id, newEmail, callback) {
    let MailingList = this;

    if (!newEmail) {
        callback(new HttpError(400, 'Email should be provided'))
    }

    async.waterfall([
        (callback) => {
            MailingList.findByIdAndUpdate(id, newEmail, callback);
        }
    ], callback);
};

schema.statics.deleteEmail = function (id, callback) {
    let MailingList = this;

    async.waterfall([
        (callback) => {
            MailingList.findByIdAndRemove(id, callback);
        }
    ], callback);
};

schema.statics.getAll = function () {
    let MailingList = this;

    return new Promise((resolve, reject) => {
        MailingList.find({}, (err, records) => {
            if (err) reject(err);
            resolve(records);
        });
    });
};

exports.MailingList = mongoose.model('MailingList', schema);