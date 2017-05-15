const zabbixReporter = require('reporter');
const ReportSchedule = require('models/report-schedule.model').ReportSchedule;

exports.get = function (req, res, next) {
    return ReportSchedule.getAll()
        .then(records => res.status(200).send(records))
        .catch(err => res.status(500).send(err));
};

exports.put = function (req, res, next) {
    return ReportSchedule.saveAvailabilityInterval(req.body)
        .then(() => res.status(200).send({message: 'Interval updated'}))
        .catch(err => res.status(500).send(err));
};
