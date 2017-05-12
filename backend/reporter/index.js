const MailingList = require('models/mailing-list.model').MailingList;
const MailgunSender = require('./mailgun-mail-sender');
const pug = require('pug');
const fetch = require('node-fetch');
const _ = require('lodash');

const ZABBIX_URL = 'https://jsonplaceholder.typicode.com/users';

//////////////////////////////////////////////////

function sendReport() {
    return fetch(ZABBIX_URL)
        .then(res => res.text())
        .then(body => renderEmailTemplate(body))
        .then(emailContent => {
            return new Promise((resolve, reject) => {
                MailingList.find({}, (err, mailingLists) => {
                    if (err) return reject(err);

                    mailingLists.forEach(email => {
                        MailgunSender.sendEmail(email.email, 'ZABBIX REPORT', emailContent);
                    });

                    resolve();
                })
            });
        });
}

function renderEmailTemplate(users) {
    return pug.renderFile('backend/reporter/email-template.pug', {
        users: JSON.parse(users)
    });
}

module.exports = sendReport;