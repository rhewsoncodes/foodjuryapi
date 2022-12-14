const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portionSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    portionSize: {
      type: String,
      enum: ["SMALL", "MEDIUM", "LARGE"],
      default: "MEDIUM",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portion", portionSchema);
