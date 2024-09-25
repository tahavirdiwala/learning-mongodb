const reviewController = require("../controllers/review.controller");

const router = require("express").Router();

router.route("/review").post(reviewController.add);
