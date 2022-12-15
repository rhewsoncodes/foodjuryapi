const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symptomSchema = new Schema({
  symptomType: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Symptom", symptomSchema);
