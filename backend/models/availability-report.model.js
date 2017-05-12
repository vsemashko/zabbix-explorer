const async = require('async');
const util = require('util');
const config = require('config');
const _ = require('lodash');
const HttpError = require('error').HttpError;

const mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    host: {
        type: String,
        unique: true,
        required: true
    },
    success: {
        type: Number,
        required: true
    },
    failure: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.getAll = function () {
    let AvailabilityReport = this;

    return new Promise((resolve, reject) => {
        AvailabilityReport.find({}, (err, records) => {
            if (err) reject(err);
            resolve(records);
        });
    });
};


exports.AvailabilityReport = mongoose.model('AvailabilityReport', schema);