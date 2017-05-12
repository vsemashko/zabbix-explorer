const zabbixReporter = require('reporter');

exports.post = function (req, res, next) {
    zabbixReporter()
        .then(() => res.status(200).send({message: 'Report sent'}))
        .catch(err => res.status(500).send(err));
};
