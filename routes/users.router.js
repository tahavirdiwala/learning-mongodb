const { getUsers } = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/users")
.get(getUsers)

module.exports = router