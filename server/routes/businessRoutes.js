const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  saveBusiness,
  getBusiness,
} = require("../controllers/businessController");

const router = express.Router();

router.post("/", protect, saveBusiness);

router.get("/", protect, getBusiness);

module.exports = router;