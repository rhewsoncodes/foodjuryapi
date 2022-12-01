const express = require("express");
const router = express.Router();
const {
  getUsersFoods,
  createNewFood,
  deleteFood,
} = require("../../controllers/foodController");

router.route("/").get(getUsersFoods).post(createNewFood).delete(deleteFood);

module.exports = router;
