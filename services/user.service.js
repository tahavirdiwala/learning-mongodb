const User = require("../models/users");

class UserService {
  async getUsers() {
    return new Promise((resolve, reject) => {
      // const users = await User.find().populate("cars") // relation with populate
      User.aggregate([
        {
          $lookup: {
            from: "cars",
            localField: "cars",
            foreignField: "_id",
            as: "cars",
          },
        },
      ])
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = new UserService();
