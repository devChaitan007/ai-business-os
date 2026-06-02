const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateLeadEmail = async (req, res) => {
  try {
    const { name, company } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
Create a professional follow-up email.

Lead Name: ${name}
Company: ${company}

Keep it concise and professional.
`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      result:
        completion.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateWhatsapp = async (req, res) => {
  try {
    const { name, company } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
Write a short WhatsApp follow-up.

Lead: ${name}
Company: ${company}
`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    res.json({
      result:
        completion.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateLeadEmail,
  generateWhatsapp,
};