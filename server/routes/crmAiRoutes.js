const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  generateLeadEmail,
  generateWhatsapp,
} = require("../controllers/crmAiController");

const router = express.Router();

router.post(
  "/email",
  protect,
  generateLeadEmail
);

router.post(
  "/whatsapp",
  protect,
  generateWhatsapp
);

module.exports = router;