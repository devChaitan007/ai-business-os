const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  addKnowledge,
  getKnowledge,
} = require("../controllers/knowledgeController");

const router = express.Router();

router.post("/", protect, addKnowledge);
router.get("/", protect, getKnowledge);

module.exports = router;