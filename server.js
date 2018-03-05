const express = require("express");
const bodyParser = require("body-parser");
var passport = require('./passport.js');

const db = require("./models");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(passport.initialize());

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
db.sequelize.Promise = global.Promise;

// Start the API server
db.sequelize.sync({ force: true }).then(function () {

    app.listen(PORT, function () {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
});
