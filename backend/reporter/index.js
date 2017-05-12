const pug = require('pug');
const fetch = require('node-fetch');
const Mailgun = require('mailgun-js');
const config = require('config');
const MailingList = require('models/mailing-list.model').MailingList;
const _ = require('lodash');

const mailgun = new Mailgun({
    apiKey: config.get('mailgun:apiKey'),
    domain: config.get('mailgun:domain')
});

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
                        sendEmail(email.email, 'ZABBIX TEST', emailContent);
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

function sendEmail(to, subject, htmlBody) {
    let data = {
        from: config.get('mailgun:senderFrom'),
        to: to,
        subject: subject,
        html: htmlBody
    };
    mailgun.messages().send(data, (err, body) => {
        if (err) {
            return console.log("got an error: ", err);
        }
        console.log(`Message sent. id = ${body.id}; \nmessage = ${body.message}`);
    });
}

module.exports = sendReport;