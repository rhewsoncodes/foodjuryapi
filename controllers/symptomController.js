const Symptom = require("../model/Symptom");
const User = require("../model/User");

const getUserSymptoms = async (req, res) => {
  const result = await Symptom.find({ owner: req.user });
  if (!result) return res.status(204).json({ message: "No Symptoms found" });
  res.json(result);
};

const createSymptom = async (req, res) => {
  if (!req?.body?.symptomType)
    return res.status(400).json({ message: "Symptom type required " });
  try {
    const newSymptom = await Symptom.create({
      symptomType: req.body.symptomType,
      owner: req.user,
    });
    const ourUser = await User.findOne({ _id: req.user }).exec();
    ourUser.symptoms.push(newSymptom);
    ourUser.save();
    res.json("SYMPTOM CREATED");
  } catch (err) {
    console.error(err);
  }
};

const deleteSymptom = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "ID of symptom to be deleted required" });
  try {
    const symptom = await Symptom.findOne({ _id: req.body.id }).exec();
    if (!symptom)
      return res
        .status(204)
        .json({ message: `No food matches ID ${req.body.id}` });
    const result = await Symptom.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserSymptoms, createSymptom, deleteSymptom };
