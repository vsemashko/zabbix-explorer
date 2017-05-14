const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const config = require('config');
const bodyParser = require('body-parser');
const ReportSchedule = require('models/report-schedule.model').ReportSchedule;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(require('routes'));

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

app.use((req, res, next) => next(404));

app.use(require('middleware/handleHttpErrors'));

ReportSchedule.runAvailabilityReportSchedule();

http.createServer(app).listen(config.get('port'), (err) => {
    console.log('listening in http://localhost:' + config.get('port'));
});

