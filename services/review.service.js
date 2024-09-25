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

  async getReview(req) {
    return new Promise((resolve, reject) => {
      ReviewModel.findOne({ _id: req.params.id }).then(resolve).catch(reject);
    });
  }

  async editReview(req) {
    return new Promise((resolve, reject) => {
      const id = req.params.id;
      const options = { new: true };
      ReviewModel.findByIdAndUpdate(id, req.body, options)
        .then(resolve)
        .catch(reject);
    });
  }

  async deleteProduct(req) {
    return new Promise((resolve, reject) => {
      const id = req.params.id;
      ReviewModel.findByIdAndDelete(id).then(resolve).catch(reject);
    });
  }
}

module.exports = new ReviewService();
