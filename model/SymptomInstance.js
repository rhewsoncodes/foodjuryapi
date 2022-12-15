const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symptomInstanceSchema = new Schema(
  {
    symptom: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SymptomInstance", symptomInstanceSchema);
