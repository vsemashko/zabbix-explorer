const express = require('express');
const quoter = require('../quoter');

const app = module.exports = express.Router();

app.post('/login', require('./login').post);
app.post('/users', require('./users').post);

app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));