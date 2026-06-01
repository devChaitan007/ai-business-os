import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ProposalGenerator() {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const generateProposal = async () => {
    if (
      !clientName ||
      !service ||
      !budget ||
      !timeline
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
Create a professional business proposal.

Client Name: ${clientName}
Service: ${service}
Budget: ${budget}
Timeline: ${timeline}

Include:
1. Executive Summary
2. Scope of Work
3. Deliverables
4. Timeline
5. Pricing
6. Terms & Conditions

Make it client-ready.
`;

      const res = await api.post("/ai/chat", {
        message: prompt,
      });

      setProposal(res.data.reply);

    } catch (error) {
      console.log(error);
      alert("Failed to generate proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Proposal Generator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) =>
                setClientName(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Service"
              value={service}
              onChange={(e) =>
                setService(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Budget"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              placeholder="Timeline"
              value={timeline}
              onChange={(e) =>
                setTimeline(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <button
              onClick={generateProposal}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded"
            >
              {loading
                ? "Generating..."
                : "Generate Proposal"}
            </button>

          </div>

          {proposal && (
            <div className="mt-8">

              <h2 className="text-xl font-bold mb-4">
                Generated Proposal
              </h2>

              <textarea
                value={proposal}
                readOnly
                rows={20}
                className="w-full border p-4 rounded bg-slate-50"
              />

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProposalGenerator;