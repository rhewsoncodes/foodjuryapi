const express = require("express");
const router = express.Router();
const {
  getUserMeals,
  createNewMeal,
  editMeal,
  deleteMeal,
} = require("../../controllers/mealController");

router
  .route("/")
  .get(getUserMeals)
  .post(createNewMeal)
  .put(editMeal)
  .delete(deleteMeal);

module.exports = router;
