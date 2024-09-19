const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    // const users = await User.find().populate("cars") // relation with populate
    const users = await User.aggregate([ // relation with aggregate lookup
      {$lookup: {
        from : "cars",
        localField: "cars",
        foreignField: "_id",
        as: "cars"
      }}
    ])
    sendResponse(res, StatusCodes.OK, "Users Fetched SuccessFully", users);
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, `${err.message}`);
  }
};

module.exports = {
    getUsers
}