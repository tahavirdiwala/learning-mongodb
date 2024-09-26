const userController = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/users").post(userController.add).get(userController.getAll);

module.exports = router;
