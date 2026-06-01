const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const Business = require("../models/Business");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Load user's business profile
    const business = await Business.findOne({
      userId: req.user.id,
    });

    let systemPrompt = `
You are an AI Business Assistant.

Help the user with:
- Marketing
- Sales
- Customer support
- Business growth
- Content creation
- Strategy
`;

    if (business) {
      systemPrompt += `

Business Information:

Business Name: ${business.businessName}
Industry: ${business.industry}
Products: ${business.products}
Services: ${business.services}
Target Audience: ${business.targetAudience}
Website: ${business.website}

Always tailor your answers specifically for this business.
`;
    }

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    res.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatWithAI,
};
