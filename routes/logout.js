const express = require("express");
const { handleLogout } = require("../controllers/logoutController");
const router = express.Router();
const logoutController = "../controllers/logoutController";

router.get("/", handleLogout);

module.exports = router;
