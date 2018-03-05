const router = require("express").Router();
const commentRoutes = require("./comments");
const userRoutes = require("./users");
const pageRoutes = require("./pages");

// Book routes
router.use("/comments", commentRoutes)
      .use("/users", userRoutes)
      .use("/pages", pageRoutes);


module.exports = router;
