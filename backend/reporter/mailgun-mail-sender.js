const Mailgun = require('mailgun-js');
const config = require('config');

const mailgun = new Mailgun({
    apiKey: config.get('mailgun:apiKey'),
    domain: config.get('mailgun:domain')
});

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

module.exports.sendEmail = sendEmail;