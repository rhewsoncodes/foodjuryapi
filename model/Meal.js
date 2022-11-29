const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealDateTime: {
    type: Date,
    required: true,
    timestamps: true,
  },
  foodName: {
    type: Schema.Types.ObjectId,
    ref: "Food",
  },
});

module.exports = mongoose.model("");
