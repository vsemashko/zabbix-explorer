const mongoose = require('lib/mongoose');
const async = require('async');
const generateReportData = require('./generate_report_data');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    createMailingList,
    createReportSchedule,
    createAvailabilityReportData
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
    let users = [
        {username: 'qwe', password: 'qwe'},
        {username: 'user', password: 'user'},
        {username: 'admin', password: 'admin'}
    ];

    async.each(users, function(userData, callback) {
        let user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

function createMailingList(callback) {
    let mailingLists = [
        {email: 'vladimirsemashko@mail.ru'}
    ];

    async.each(mailingLists, function(mailingList, callback) {
        let list = new mongoose.models.MailingList(mailingList);
        list.save(callback);
    }, callback);
}

function createReportSchedule(callback) {
    const DAY = 1000 * 60 * 60 * 24;
    let reportsSchedule = [
        {report: 'Availability Report', interval: DAY}
    ];

    async.each(reportsSchedule, function(report, callback) {
        let list = new mongoose.models.ReportSchedule(report);
        list.save(callback);
    }, callback);
}

function createAvailabilityReportData(callback) {
    let reports = generateReportData(600);
    async.each(reports, function(report, callback) {
        let availabilityReport = new mongoose.models.AvailabilityReport(report);
        availabilityReport.save(callback);
    }, callback);
}