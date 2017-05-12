const MailingList = require('models/mailing-list.model').MailingList;

exports.get = function (req, res, next) {
    MailingList.find({}, (err, mailingLists) => {
        if (err) return next(err);

        res.status(200).send(mailingLists);
    });
};

exports.post = function (req, res, next) {
    MailingList.createEmail(req.body, (err, createdEmail) => {
        if (err) return next(err);
        res.status(200).send(createdEmail);
    });
};

exports.put = function (req, res, next) {
    let id = req.params.id;
    MailingList.updateEmail(id, req.body, (err, updatedEmail) => {
        if (err) return next(err);
        res.status(200).send(updatedEmail);
    });
};

exports.delete = function (req, res, next) {
    MailingList.deleteEmail(req.params.id, (err) => {
        if (err) return next(err);
        res.status(200).send({message: 'Email deleted'});
    });
};