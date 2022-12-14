const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    portions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Portion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);
