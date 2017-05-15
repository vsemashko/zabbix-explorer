const zabbixReporter = require('reporter');
const AvailabilityReport = require('models/availability-report.model').AvailabilityReport;
const ReportSchedule = require('models/report-schedule.model').ReportSchedule;

exports.get = function (req, res, next) {
    return AvailabilityReport.getAll()
        .then(reportRecords => res.status(200).send(reportRecords))
        .catch(err => res.status(500).send(err));
};


exports.post = function (req, res, next) {
    zabbixReporter()
        .then(() => ReportSchedule.updateLastSent())
        .then(() => res.status(200).send({message: 'Report sent'}))
        .catch(err => res.status(500).send(err));
};
