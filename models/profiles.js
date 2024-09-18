const mongoose = require("mongoose"), Schema = mongoose

const Profiles = mongoose.model("Profiles", new mongoose.Schema({
    firstName: String,
    lastName: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}))

module.exports = Profiles