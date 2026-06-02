import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function KnowledgeBase() {
  const [items, setItems] = useState([]);

  const [pdf, setPdf] = useState(null);

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
      if (!form.title || !form.content) return;

      await api.post("/knowledge", form);

      setForm({
        title: "",
        content: "",
      });

      loadKnowledge();
    } catch (err) {
      console.log(err);
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
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded"
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
            className="ml-4 bg-green-600 text-white px-5 py-2 rounded"
          >
            Upload PDF
          </button>

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
                    ? item.content.slice(0, 500) + "..."
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