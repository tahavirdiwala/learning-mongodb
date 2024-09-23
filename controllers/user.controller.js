const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");
const responser = require("../common");

const getUsers = async (req, res) => {
  try {
    // const users = await User.find().populate("cars") // relation with populate
    
    // relation with aggregate lookup
    const users = await User
    .aggregate([ 
      {
        $lookup: {
        from : "cars",
        localField: "cars",
        foreignField: "_id",
        as: "cars"
      }}
    ])
    responser(res, StatusCodes.OK, "Users Fetched SuccessFully", users);
  } catch (err) {
    responser(res, StatusCodes.BAD_REQUEST, err.message);
  }
};

module.exports = {
    getUsers
}