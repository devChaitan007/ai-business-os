const express = require("express");
const protect = require("../middleware/authMiddleware");
const Lead = require("../models/Lead");
const router = express.Router();

router.post("/score/:id", protect, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const text = `
You are a sales expert.

Analyze this lead and give:

1. Score (0-100)
2. Priority (Low, Medium, High)
3. Reasons
4. Suggested Action

Lead Details:
Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company}
Notes: ${lead.notes || "N/A"}
`;

    const aiRes = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });

    const data = await aiRes.json();

    res.json({
      analysis: data.reply,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;