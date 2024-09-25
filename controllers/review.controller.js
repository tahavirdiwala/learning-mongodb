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

  async getAll(req, res) {
    try {
      const reviews = await reviewService.getReviews(req);
      sendResponse(
        res,
        StatusCodes.OK,
        "Reviews Fetched SuccessFully",
        reviews
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async get(req, res) {
    try {
      const review = await reviewService.getReview(req);
      sendResponse(res, StatusCodes.OK, "Review Fetched SuccessFully", review);
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async edit(req, res) {
    try {
      const review = await reviewService.editReview(req);
      sendResponse(res, StatusCodes.OK, "Reviews Edited SuccessFully", review);
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async delete(req, res) {
    try {
      const product = await reviewService.deleteProduct(req);
      sendResponse(res, StatusCodes.OK, product);
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message || err);
    }
  }
}

module.exports = new ReviewController();
