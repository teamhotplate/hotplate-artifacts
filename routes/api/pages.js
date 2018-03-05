const passport = require('passport');
const router = require("express").Router();
const pagesController = require("../../controllers/pagesController");

// Matches with "/api/books"
router.route("/")
    .get(pagesController.findAll)
    .post(pagesController.create, passport.authenticate('jwt', { session: false }));
// Matches with "/api/books/:id"s
router
    .route("/u/:id")
    .get(pagesController.findByUser);

router
    .route("/:id")
    .get(pagesController.findById);

module.exports = router;
