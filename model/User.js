const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  refreshToken: String,
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
  symptoms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Symptom",
    },
  ],
  dailyRatings: [
    {
      type: Schema.Types.ObjectId,
      ref: "dailyRating",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
