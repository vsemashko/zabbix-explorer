const MailingList = require('models/mailing-list.model').MailingList;

exports.get = function (req, res, next) {
    MailingList.find({}, (err, mailingLists) => {
        if (err) return next(err);

        res.status(200).send(mailingLists);
    });
};