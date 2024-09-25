const ReviewModel = require("../models/review");

class ReviewService {
  async addReview(req) {
    return new Promise((resolve, reject) => {
      ReviewModel.create(req.body).then(resolve).catch(reject);
    });
  }

  async getReviews(req) {
    return new Promise((resolve, reject) => {
      ReviewModel.find().then(resolve).catch(reject);
    });
  }
}

module.exports = new ReviewService();
