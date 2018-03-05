// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = {

    // Get rotue for retrieving a single post
    findById: function (req, res) {

        db.sequelize.query(
            "select a.*, b.username from Comments a "+
            "left outer join Users b "+
            "on a.UserId = b.id "+
            "where a.PageId = " + req.params.id,
            { type: db.sequelize.QueryTypes.SELECT,
            order: db.sequelize.literal('createdAt DESC')
        }).then(function (dbComment) {
            console.log(dbComment);
            res.json(dbComment);
        });
    },

    findByUser: function (req, res) {

        db.sequelize.query(
            "select * from Comments a " +
            "where a.UserId = " + req.params.id,
            { type: db.sequelize.QueryTypes.SELECT }
        ).then(function (dbComment) {
            console.log(dbComment);
            res.json(dbComment);
        });
    },

    create: function (req, res) {
        var newCommentObj;
        if (req.body.ParentId === ''){
            newCommentObj = {
            text: req.body.text,
            side: req.body.side,
            points: 0,
            reportFlg: false,
            ParentId: null,
            PageId: req.body.PageId,
            UserId: req.body.UserId
            };
        } else {
            newCommentObj = {
                text: req.body.text,
                side: req.body.side,
                points: 0,
                reportFlg: false,
                ParentId: req.body.ParentId,
                PageId: req.body.PageId,
                UserId: req.body.UserId
            }
        }
        db.Comment.create(newCommentObj).then(function (dbComment) {
            res.json(dbComment);
        });
    },

    delete: function (req, res) {
        db.Comment.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    }
};