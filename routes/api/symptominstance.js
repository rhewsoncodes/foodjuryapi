const express = require("express");
const router = express.Router();
const {
  getSymptomInstances,
  createSymptomInstance,
  deleteSymptomInstance,
} = require("../../controllers/symptomInstanceController");

router
  .route("/")
  .get(getSymptomInstances)
  .post(createSymptomInstance)
  .delete(deleteSymptomInstance);

module.exports = router;
