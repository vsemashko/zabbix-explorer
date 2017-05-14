const async = require('async');
const util = require('util');
const _ = require('lodash');
const mongoose = require('lib/mongoose');
const scheduler = require('lib/scheduler');
const Schema = mongoose.Schema;
const zabbixReporter = require('reporter');

const schema = new Schema({
    report: {
        type: String,
        unique: true,
        required: true
    },
    interval: {
        type: Number,
        required: true
    },
    lastSent: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.getAll = function () {
    let ReportSchedule = this;

    return new Promise((resolve, reject) => {
        ReportSchedule.find({}, (err, records) => {
            if (err) reject(err);
            resolve(records);
        });
    });
};

schema.statics.saveAvailabilityInterval = function (interval) {
    let ReportSchedule = this;

    return new Promise((resolve, reject) => {
        ReportSchedule.findOne({report: 'Availability Report'}, (err, report) => {
            if (err) reject(err);
            report.interval = interval;
            report.save(resolve);
            scheduler(zabbixReporter, report.interval);
        });
    });
};

schema.statics.runAvailabilityReportSchedule = function () {
    let ReportSchedule = this;
    ReportSchedule.findOne({report: 'Availability Report'}, (err, report) => {
        if (err) throw err;
        scheduler(zabbixReporter, report.interval);
    });
};

exports.ReportSchedule = mongoose.model('ReportSchedule', schema);