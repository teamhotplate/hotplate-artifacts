const passport = require('passport');
const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");

// Matches with "/api/books"
router.route("/")
    .post(commentsController.create, passport.authenticate('jwt', { session: false }));

// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(commentsController.findById)
    .delete(commentsController.delete, passport.authenticate('jwt', { session: false }));

router
    .route("/u/:id")
    .get(commentsController.findByUser)

module.exports = router;
