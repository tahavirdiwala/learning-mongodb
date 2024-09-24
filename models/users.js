const mongoose = require("mongoose"),
  Schema = mongoose;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: "Car", // one to many relation
      },
    ],
  })
);

module.exports = User;
