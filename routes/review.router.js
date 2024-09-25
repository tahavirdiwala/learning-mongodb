const reviewController = require("../controllers/review.controller");

const router = require("express").Router();

router.route("/review").get(reviewController.getAll).post(reviewController.add);

router
  .route("/review/:id")
  .get(reviewController.get)
  .put(reviewController.edit)
  .delete(reviewController.delete);

module.exports = router;
