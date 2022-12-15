const express = require("express");
const router = express.Router();
const {
  getUserSymptoms,
  createSymptom,
  deleteSymptom,
} = require("../../controllers/symptomController");

router
  .route("/")
  .get(getUserSymptoms)
  .post(createSymptom)
  .delete(deleteSymptom);

module.exports = router;
