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
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  symptoms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Symptom",
    },
  ],
  symptomInstances: [
    {
      type: Schema.Types.ObjectId,
      ref: "SymptomInstance",
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
