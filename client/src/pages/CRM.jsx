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
  });

  const loadLeads = async () => {
    const res = await api.get("/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const addLead = async () => {
    if (!form.name) return;

    await api.post("/leads", form);

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    loadLeads();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          CRM
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <div className="grid grid-cols-2 gap-4">

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

          </div>

          <button
            onClick={addLead}
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded"
          >
            Add Lead
          </button>

        </div>

        <div className="bg-white rounded-xl shadow">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.company}
                  </td>

                  <td className="p-4">
                    {lead.status}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default CRM;