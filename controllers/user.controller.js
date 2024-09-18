const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("cars")
    sendResponse(res, StatusCodes.OK, "Users Fetched SuccessFully", users);
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, `${err.message}`);
  }
};

module.exports = {
    getUsers
}