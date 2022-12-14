const Portion = require("../model/Portion");
const User = require("../model/User");
const Food = require("../model/Food");

const getUserPortions = async (req, res) => {
  const result = await Portion.find({ owner: req.user });
  if (!result) return res.status(204).json({ message: "No foods found" });
  res.json(result);
};

const createUserPortion = async (req, res) => {
  if (!req?.body?.food || !req?.body?.portionSize)
    return res.status(400).json({ message: "food and portion size required" });
  try {
    const newPortion = await Portion.create({
      food: req.body.food,
      portionSize: req.body.portionSize,
      owner: req.user,
    });
    res.json("PORTION CREATED");
  } catch (err) {
    console.error(err);
  }
};

const deleteUserPortion = async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: "ID of portion to be deleted required." });
  }
  try {
    const portion = await Portion.findOne({ _id: req.body.id }).exec();
    if (!portion)
      return res
        .status(204)
        .json({ message: `No portion matches ID ${req.body.id}` });
    const result = await Portion.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserPortions, createUserPortion, deleteUserPortion };
