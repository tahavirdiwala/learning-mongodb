const reviewController = require("../controllers/review.controller");

const router = require("express").Router();

router.route("/review").get(reviewController.getAll).post(reviewController.add);

module.exports = router;
