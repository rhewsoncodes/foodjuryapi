const Meal = require("../model/Meal");
const User = require("../model/User");

const getUserMeals = async (req, res) => {
  const result = await Meal.find({ owner: req.user });
  if (!result) return res.status(204).json({ message: "No meals found " });
  res.json(result);
};

const createNewMeal = async (req, res) => {
  if (!req?.body?.portions)
    return res.status(400).json({ message: "portions for meal required" });
  try {
    const newMeal = await Meal.create({
      portions: req.body.portions,
      owner: req.user,
    });
    const ourUser = await User.findOne({ _id: req.user }).exec();
    ourUser.meals.push(newMeal);
    ourUser.save();
    res.json("MEAL CREATED");
  } catch (err) {
    console.error(err);
  }
};

const editMeal = async (req, res) => {
  if (!req?.body?.portions || !req?.body?.id)
    return res.status(400).json({
      message: "portions for meal and id for meal to be edited required.",
    });
  try {
    const ourMeal = await Meal.findOne({ _id: req.body.id }).exec();
    ourMeal.portions = req.body.portions;
    ourMeal.save();
    res.json("MEAL EDITED SUCCESSFULLY");
  } catch (err) {
    console.error(err);
  }
};

const deleteMeal = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "id for meal to be deleted required" });
  try {
    const meal = await Meal.findOne({ _id: req.body.id }).exec();
    if (!meal)
      return res
        .status(204)
        .json({ message: `No food matches ID ${req.body.id}` });
    const result = await Meal.deleteOne({ _id: req.body.id });
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserMeals, createNewMeal, editMeal, deleteMeal };
