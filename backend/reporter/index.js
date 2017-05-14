const MailingList = require('models/mailing-list.model').MailingList;
const AvailabilityReport = require('models/availability-report.model').AvailabilityReport;
const MailgunSender = require('./mailgun-mail-sender');
const pug = require('pug');
const fetch = require('node-fetch');
const _ = require('lodash');

//////////////////////////////////////////////////

function sendReport() {
    return AvailabilityReport.getAll()
        .then(records => renderEmailTemplate(records))
        .then(emailContent => {
            return MailingList.getAll().then(mailingLists => {
                mailingLists.forEach(email => {
                    MailgunSender.sendEmail(email.email, 'ZABBIX REPORT', emailContent);
                });
            });
        });
}

function renderEmailTemplate(records) {
    return pug.renderFile('backend/reporter/email-template.pug', {
        records: records
    });
}

module.exports = sendReport;