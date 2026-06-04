const express = require("express");
const protect = require("../middleware/authMiddleware");
const Knowledge = require("../models/Knowledge");

const router = express.Router();

router.post("/ask", protect, async (req, res) => {
  try {
    const { question } = req.body;

    const knowledge = await Knowledge.find({
      userId: req.user.id,
    });

    if (!knowledge.length) {
      return res.json({
        answer: "No knowledge found.",
      });
    }

    const knowledgeText = knowledge
      .map((k) => k.content)
      .join("\n\n");

    const prompt = `
You are an AI assistant.

Answer ONLY using the knowledge below.

KNOWLEDGE:
${knowledgeText}

QUESTION:
${question}
`;

    const aiRes = await fetch(
      "http://localhost:5000/api/ai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            req.headers.authorization,
        },
        body: JSON.stringify({
          message: prompt,
        }),
      }
    );

    const data = await aiRes.json();

    res.json({
      answer: data.reply,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;