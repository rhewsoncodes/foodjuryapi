const express = require("express");
const router = express.Router();
const {
  getUserPortions,
  createUserPortion,
  deleteUserPortion,
} = require("../../controllers/portionController");

router
  .route("")
  .get(getUserPortions)
  .post(createUserPortion)
  .delete(deleteUserPortion);

module.exports = router;
