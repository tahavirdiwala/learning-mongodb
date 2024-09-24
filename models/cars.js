const mongoose = require("mongoose"),
  Schema = mongoose;

const Cars = mongoose.model(
  "Car",
  new mongoose.Schema({
    make: String,
    model: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Cars;
