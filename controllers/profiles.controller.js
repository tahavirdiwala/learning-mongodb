const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../common");
const IdentifiersModel = require("../models/profiles");
const Profiles = require("../models/profiles");

const getProfiles = async (req, res) => {
  try {
    const resp = await Profiles.find().populate("user"); // one to one relation
    sendResponse(res, StatusCodes.OK, "Profiles Fetched SuccessFully", resp);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProfiles,
};
