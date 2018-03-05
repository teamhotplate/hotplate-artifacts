const passport = require('passport');
const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/books"
router.route("/")
  .get(usersController.findAll, passport.authenticate('jwt', { session: false }))
  .post(usersController.register);
// Matches with "/api/books/:id"s
router
  .route("/:id")
  .get(usersController.findById, passport.authenticate('jwt', { session: false }))
  .delete(usersController.delete, passport.authenticate('jwt', { session: false }));

module.exports = router;
