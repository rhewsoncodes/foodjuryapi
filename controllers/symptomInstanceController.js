const SymptomInstance = require("../model/SymptomInstance");
const User = require("../model/User");

const getSymptomInstances = async (req, res) => {
  result = await SymptomInstance.find({ owner: req.user });
  if (!result)
    res.status(204).json({ message: "No symptomInstances found for user" });
  res.json(result);
};

const createSymptomInstance = async (req, res) => {
  if (!req?.body?.symptom)
    return res.status(400).json({ message: "Symptom type required." });
  try {
    const newSymptomInstance = await SymptomInstance.create({
      symptom: req.body.symptom,
      owner: req.user,
    });
    const ourUser = await User.findOne({ _id: req.user }).exec();
    ourUser.symptomInstances.push(newSymptomInstance);
    ourUser.save();
    res.json("NEW SYMPTOM INSTANCE CREATED");
  } catch (err) {
    console.error(err);
  }
};

const deleteSymptomInstance = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "ID of symptomInstance to be deleted required" });
  try {
    const symptom = await SymptomInstance.findOne({ _id: req.body.id }).exec();
    if (!symptom)
      return res
        .status(204)
        .json({ message: `No symptomInstance matches ID ${req.body.id}` });
    const result = await SymptomInstance.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSymptomInstances,
  createSymptomInstance,
  deleteSymptomInstance,
};
