const Groq = require("groq-sdk");
const Knowledge = require("../models/Knowledge");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Load company knowledge for this user
    const knowledgeItems = await Knowledge.find({
      userId: req.user.id,
    });

    const companyKnowledge = knowledgeItems
      .map((item) => item.content)
      .join("\n\n");

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are an AI Business Assistant.

Use the company knowledge below whenever it is relevant.

Company Knowledge:
${companyKnowledge}

Rules:
- Prefer company knowledge when answering.
- If the answer is not in company knowledge, provide a helpful general answer.
- Be professional and concise.
`,
          },

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.7,
      });

    const reply =
      completion.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};