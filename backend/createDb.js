const mongoose = require('lib/mongoose');
const async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    createMailingList
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
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

function createMailingList(callback) {
    let mailingLists = [
        {email: 'qwe@qwe'},
        {email: 'eee@eeee'}
    ];

    async.each(mailingLists, function(mailingList, callback) {
        var mailingList = new mongoose.models.MailingList(mailingList);
        mailingList.save(callback);
    }, callback);
}