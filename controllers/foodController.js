const Food = require("../model/Food");
const User = require("../model/User");

const getUsersFoods = async (req, res) => {
  const result = await Food.find({ owner: req.user });
  if (!result) return res.status(204).json({ message: "No foods found" });
  res.json(result);
};

const createNewFood = async (req, res) => {
  if (!req?.body?.foodName)
    return res.status(400).json({ message: "Food name required." });
  const duplicate = Food.findOne({ foodName: req.body.foodName }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    const ourFood = await Food.create({
      foodName: req.body.foodName,
      owner: req.user,
    });
    const ourUser = await User.findOne({ _id: req.user }).exec();
    ourUser.foods.push(ourFood);
    ourUser.save();
    res.json("FOOD CREATED");
  } catch (err) {
    console.error(err);
  }
};

const deleteFood = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "ID of food to be deleted required" });
  try {
    const food = await Food.findOne({ _id: req.body.id }).exec();
    if (!food)
      return res
        .status(204)
        .json({ message: `No food matches ID ${req.body.id}` });
    const result = await Food.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUsersFoods, createNewFood, deleteFood };
