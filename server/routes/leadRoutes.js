const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const router = express.Router();

router.get("/", protect, getLeads);

router.post("/", protect, createLead);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

module.exports = router;