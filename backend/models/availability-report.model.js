const async = require('async');
const _ = require('lodash');
const mongoose = require('lib/mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
const SchemaTypes = mongoose.Schema.Types;

const schema = new Schema({
    host: {
        type: String,
        unique: true,
        required: true
    },
    success: {
        type: SchemaTypes.Double,
        required: true
    },
    failure: {
        type: SchemaTypes.Double,
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