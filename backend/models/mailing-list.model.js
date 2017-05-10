const async = require('async');
const util = require('util');
const config = require('config');
const _ = require('lodash');

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

exports.MailingList = mongoose.model('MailingList', schema);