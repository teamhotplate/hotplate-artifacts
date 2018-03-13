
const exjwt = require('express-jwt');

const config = exjwt({
    secret: "TEST!"
});

module.exports = config;