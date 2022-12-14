const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Food", foodSchema);
