import { useState } from "react";
import api from "../services/api";

function EmailWriter() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("Professional");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    if (!purpose || !recipient) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
Write a professional business email.

Purpose: ${purpose}
Recipient: ${recipient}
Tone: ${tone}

Generate:
- Subject Line
- Email Body
- Call To Action
`;

      const res = await api.post("/ai/chat", {
        message: prompt,
      });

      setEmail(res.data.reply);

    } catch (error) {
      console.log(error);
      alert("Error generating email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Email Writer
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-4xl">

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Purpose"
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Recipient"
            value={recipient}
            onChange={(e) =>
              setRecipient(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <select
            value={tone}
            onChange={(e) =>
              setTone(e.target.value)
            }
            className="w-full border p-3 rounded"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Formal</option>
            <option>Persuasive</option>
          </select>

          <button
            onClick={generateEmail}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Generating..."
              : "Generate Email"}
          </button>

        </div>

        {email && (
          <div className="mt-8">

            <h2 className="font-bold text-xl mb-3">
              Generated Email
            </h2>

            <textarea
              value={email}
              readOnly
              rows={15}
              className="w-full border p-4 rounded bg-slate-50"
            />

          </div>
        )}

      </div>

    </div>
  );
}

export default EmailWriter;