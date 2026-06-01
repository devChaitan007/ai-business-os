import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function SocialMediaGenerator() {
  const [platform, setPlatform] = useState("Instagram");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!topic) {
      alert("Enter a topic");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
Create a social media post.

Platform: ${platform}
Topic: ${topic}
Tone: ${tone}

Include:
- Engaging hook
- Main content
- Call to action
- Relevant hashtags

Make it optimized for ${platform}.
`;

      const res = await api.post("/ai/chat", {
        message: prompt,
      });

      setContent(res.data.reply);

    } catch (error) {
      console.log(error);
      alert("Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Social Media Generator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">

          <div className="space-y-4">

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
              className="w-full border p-3 rounded"
            >
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Facebook</option>
              <option>X (Twitter)</option>
            </select>

            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
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
              <option>Persuasive</option>
              <option>Exciting</option>
            </select>

            <button
              onClick={generateContent}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded"
            >
              {loading
                ? "Generating..."
                : "Generate Content"}
            </button>

          </div>

          {content && (
            <div className="mt-8">

              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">
                  Generated Content
                </h2>

                <button
                  onClick={copyContent}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Copy
                </button>
              </div>

              <textarea
                value={content}
                readOnly
                rows={15}
                className="w-full border p-4 rounded bg-slate-50"
              />

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default SocialMediaGenerator;