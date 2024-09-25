const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const userService = require("../services/user.service");

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getUsers();
      sendResponse(res, StatusCodes.OK, "Users Fetched SuccessFully", users);
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }
}

module.exports = new UserController();
