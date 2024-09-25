const reviewController = require("../controllers/review.controller");

const router = require("express").Router();

router.route("/review").post(reviewController.add).get(reviewController.getAll);

router
  .route("/review/:id")
  .get(reviewController.get)
  .put(reviewController.edit)
  .delete(reviewController.delete);

module.exports = router;
