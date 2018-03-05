// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = {

    // GET route for getting all of the posts
    findAll: function (req, res) {
        // 1. Add a join here to include all of the Authors to these posts
        db.Page.findAll({
            include: { 
                model: db.User,
                attributes: { exclude: ['pass'] }  
            },
            order: db.sequelize.literal('createdAt DESC')
        }).then(function (dbPage) {
            res.json(dbPage);
        });
    },

    findByUser: function (req, res) {
        // 1. Add a join here to include all of the Authors to these posts
        db.Page.findAll({
            where: { UserId: req.params.id },
            order: db.sequelize.literal('createdAt DESC')
        }).then(function (dbPage) {
            res.json(dbPage);
        });
    },

    // Get rotue for retrieving a single post
    findById: function (req, res) {
        // 2. Add a join here to include the Author who wrote the Post
        db.Page.findOne({
            include: {
                model: db.User,
                attributes: ['username'],
            },
            where: {id: req.params.id}
        }).then(function (dbPage) {
            console.log(dbPage);
            res.json(dbPage);
        });
    },

    create: function (req, res) {
        // Create a User with the data available to us in req.body
        console.log('BODY: '+JSON.stringify(req.body));
        db.Page.create(req.body).then(function (dbPage) {
            res.json(dbPage);
        });
    }
};
