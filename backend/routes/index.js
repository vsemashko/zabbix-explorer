const express = require('express');
const checkAuth = require('middleware/checkAuth');

const app = module.exports = express.Router();

app.post('/login', require('./login.routes').post);
app.post('/users', require('./users.routes').post);

app.use('/api', checkAuth);
app.get('/api/mailing-lists', require('./mailing-lists.routes').get);

app.use(require('middleware/handleUnauthorizedErrors'));