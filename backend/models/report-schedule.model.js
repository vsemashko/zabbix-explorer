const async = require('async');
const util = require('util');
const _ = require('lodash');
const mongoose = require('lib/mongoose');
const scheduleTask = require('lib/scheduler').scheduleTask;
const cancelScheduler = require('lib/scheduler').cancelScheduler;
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
    active: {
        type: Boolean,
        default: true
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

schema.statics.saveAvailabilityInterval = function (schedule) {
    let ReportSchedule = this;

    return new Promise((resolve, reject) => {
        ReportSchedule.findOne({report: 'Availability Report'}, (err, report) => {
            if (err) reject(err);
            _.assign(report, schedule);
            report.save(resolve);
            configureAvailabilityReportScheduler(report, ReportSchedule);
        });
    });
};

schema.statics.runAvailabilityReportSchedule = function () {
    let ReportSchedule = this;
    ReportSchedule.findOne({report: 'Availability Report'}, (err, report) => {
        if (err) throw err;
        configureAvailabilityReportScheduler(report, ReportSchedule);
    });
};

schema.statics.updateLastSent = function (lastSent = Date.now()) {
    let ReportSchedule = this;

    return new Promise((resolve, reject) => {
        ReportSchedule.findOne({report: 'Availability Report'}, (err, report) => {
            if (err) reject(err);
            report.lastSent = lastSent;
            report.save(resolve);
        });
    });
};

function configureAvailabilityReportScheduler(report, ReportSchedule) {
    if (report.active) {
        scheduleTask(() => {
            zabbixReporter();
            ReportSchedule.updateLastSent();
        }, report.interval);
    } else {
        cancelScheduler();
    }
}

exports.ReportSchedule = mongoose.model('ReportSchedule', schema);