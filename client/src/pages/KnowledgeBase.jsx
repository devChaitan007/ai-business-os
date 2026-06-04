import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function KnowledgeBase() {
  const [items, setItems] = useState([]);
  const [pdf, setPdf] = useState(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const loadKnowledge = async () => {
    try {
      const res = await api.get("/knowledge");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  const saveKnowledge = async () => {
    try {
      if (!form.title || !form.content) {
        alert("Please fill all fields");
        return;
      }

      await api.post("/knowledge", form);

      setForm({
        title: "",
        content: "",
      });

      loadKnowledge();

      alert("Knowledge saved successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to save knowledge");
    }
  };

  const uploadPDF = async () => {
    try {
      if (!pdf) {
        alert("Please select a PDF");
        return;
      }

      const formData = new FormData();

      formData.append("pdf", pdf);

      await api.post(
        "/upload/pdf",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPdf(null);

      loadKnowledge();

      alert("PDF uploaded successfully");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const askKnowledge = async () => {
    try {
      if (!question.trim()) return;

      setLoadingAi(true);
      setAnswer("");

      const res = await api.post(
        "/knowledge-ai/ask",
        {
          question,
        }
      );

      setAnswer(res.data.answer);

    } catch (err) {
      console.log(err);

      setAnswer(
        "Unable to get answer from knowledge base."
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Knowledge Base
        </h1>

        {/* MANUAL KNOWLEDGE */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Add Knowledge
          </h2>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            rows={8}
            placeholder="Paste company knowledge..."
            value={form.content}
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <button
            onClick={saveKnowledge}
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Save Knowledge
          </button>

        </div>

        {/* PDF UPLOAD */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Upload PDF
          </h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setPdf(e.target.files[0])
            }
          />

          <button
            onClick={uploadPDF}
            className="ml-4 bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Upload PDF
          </button>

        </div>

        {/* AI KNOWLEDGE CHAT */}

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Ask Your Knowledge Base
          </h2>

          <textarea
            rows={4}
            placeholder="Ask a question about your uploaded documents..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            onClick={askKnowledge}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Ask AI
          </button>

          {(loadingAi || answer) && (
            <div className="mt-6 border rounded-lg p-4 bg-gray-50">

              <h3 className="font-semibold mb-3">
                AI Answer
              </h3>

              {loadingAi ? (
                <p>Thinking...</p>
              ) : (
                <div className="whitespace-pre-wrap">
                  {answer}
                </div>
              )}

            </div>
          )}

        </div>

        {/* KNOWLEDGE LIST */}

        <div className="space-y-4">

          {items.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow">
              No knowledge added yet.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600 whitespace-pre-wrap">
                  {item.content.length > 500
                    ? item.content.slice(
                        0,
                        500
                      ) + "..."
                    : item.content}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default KnowledgeBase;