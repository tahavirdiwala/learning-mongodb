const { getProfiles } = require("../controllers/identifier.controller");

const router = require("express").Router();

router.route("/profiles")
.get(getProfiles)

module.exports = router