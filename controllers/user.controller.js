const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const userService = require("../services/user.service");

class UserController {
  async add(req, res) {
    try {
      const user = await userService.addUser(req);
      sendResponse(res, StatusCodes.CREATED, "User Created SuccessFully", user);
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

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
