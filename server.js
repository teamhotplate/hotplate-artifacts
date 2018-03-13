const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const jwtMW = require('./config/auth')
const db = require("./models");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});
// Set up promises with mongoose
// Start the API server
db.sequelize.sync({ force: false }).then(function () {

    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
});
