const express = require('express');
const checkAuth = require('middleware/checkAuth');

const app = module.exports = express.Router();

app.post('/login', require('./login.routes').post);
app.post('/users', require('./users.routes').post);

app.use('/api', checkAuth);
app.get('/api/mailing-lists', require('./mailing-lists.routes').get);
app.post('/api/mailing-lists', require('./mailing-lists.routes').post);
app.put('/api/mailing-lists/:id', require('./mailing-lists.routes').put);
app.delete('/api/mailing-lists/:id', require('./mailing-lists.routes').delete);

app.get('/api/availability-report', require('./availability-report').get);
app.post('/api/send-availability-report', require('./availability-report').post);

app.get('/api/report-schedule', require('./report-schedule').get);
app.put('/api/report-schedule', require('./report-schedule').put);

app.use(require('middleware/handleUnauthorizedErrors'));