const User = require("../models/users");

class UserService {
  async addUser(req) {
    return new Promise((resolve, reject) => {
      User.create(req.body).then(resolve).catch(reject);
    });
  }

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
