const mongoose = require("mongoose"),
  Schema = mongoose;

const reviewSchema = new mongoose.Schema(
  {
    content: String,
    rating: Number,
    productId: { type: Schema.Types.ObjectId, ref: "Products" },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;
