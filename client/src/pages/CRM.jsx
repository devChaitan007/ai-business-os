import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function CRM() {
  const [leads, setLeads] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
    followUpDate: "",
  });

  const [aiOutput, setAiOutput] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // LOAD LEADS
  const loadLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // ADD LEAD
  const addLead = async () => {
    try {
      if (!form.name) return;

      await api.post("/leads", form);

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
        followUpDate: "",
      });

      loadLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      loadLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE LEAD
  const deleteLead = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this lead?"
      );

      if (!confirmDelete) return;

      await api.delete(`/leads/${id}`);
      loadLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // AI LEAD ANALYSIS
 const analyzeLead = async (id) => {
  try {
    console.log("Analyzing Lead ID:", id);

    setLoadingAi(true);
    setAiOutput("");

    const res = await api.post(
      `/leads-ai/score/${id}`
    );

    console.log("API Response:", res.data);

    setAiOutput(res.data.analysis);

  } catch (err) {
    console.log("ANALYZE ERROR:", err);

    if (err.response) {
      console.log(
        "SERVER RESPONSE:",
        err.response.data
      );
    }

    setAiOutput(
      "Analysis failed. Check browser console."
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
          CRM Management
        </h1>

        {/* ADD LEAD FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Add New Lead
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              type="date"
              value={form.followUpDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  followUpDate: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

            <input
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({
                  ...form,
                  notes: e.target.value,
                })
              }
              className="border p-3 rounded"
            />

          </div>

          <button
            onClick={addLead}
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Add Lead
          </button>

        </div>

        {/* LEADS TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Follow Up</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t">

                  <td className="p-4">
                    <div className="font-medium">
                      {lead.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {lead.email}
                    </div>
                  </td>

                  <td className="p-4">
                    {lead.company}
                  </td>

                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(
                          lead._id,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Qualified</option>
                      <option>Won</option>
                      <option>Lost</option>
                    </select>
                  </td>

                  <td className="p-4">
                    {lead.followUpDate
                      ? new Date(
                          lead.followUpDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        deleteLead(lead._id)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        analyzeLead(lead._id)
                      }
                      className="bg-blue-600 text-white px-3 py-2 rounded"
                    >
                      Analyze
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* AI OUTPUT */}
        {(loadingAi || aiOutput) && (
          <div className="bg-white p-6 rounded-xl shadow mt-8 whitespace-pre-wrap">

            <h2 className="text-xl font-bold mb-2">
              AI Lead Analysis
            </h2>

            {loadingAi
              ? "Analyzing lead..."
              : aiOutput}

          </div>
        )}

      </div>
    </div>
  );
}

export default CRM;