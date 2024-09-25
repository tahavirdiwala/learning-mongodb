const userController = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/users").get(userController.getAll);

module.exports = router;
