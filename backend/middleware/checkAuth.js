const jwt = require('express-jwt');
const config = require('../config/index');

module.exports = jwt({
    secret: config.get('secret')
});