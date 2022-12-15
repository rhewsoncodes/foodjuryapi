const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portionSchema = new Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    portionSize: {
      type: String,
      enum: ["SMALL", "MEDIUM", "LARGE"],
      default: "MEDIUM",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portion", portionSchema);
