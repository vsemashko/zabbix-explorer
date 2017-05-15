const zabbixReporter = require('reporter');
const ReportSchedule = require('models/report-schedule.model').ReportSchedule;

exports.get = function (req, res, next) {
    return ReportSchedule.getAll()
        .then(records => res.status(200).send(records))
        .catch(err => res.status(500).send(err));
};

exports.post = function (req, res, next) {
    if (!req.body.interval) {
        return next(400, 'Need to provide interval');
    }
    return ReportSchedule.saveAvailabilityInterval({interval: req.body.interval, active: req.body.active})
        .then(() => res.status(200).send({message: 'Interval updated'}))
        .catch(err => res.status(500).send(err));
};
