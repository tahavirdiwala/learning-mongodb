const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const reviewService = require("../services/review.service");

class ReviewController {
  async add(req, res) {
    try {
      const review = await reviewService.addReview(req);
      sendResponse(
        res,
        StatusCodes.CREATED,
        "Review Added Successfully",
        review
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }
}

module.exports = new ReviewController();
