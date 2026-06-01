import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get(
        "/dashboard"
      );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Total Chats
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.totalChats}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Total Leads
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.totalLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              Business Profile
            </h2>

            <p className="text-xl mt-3">
              {stats.businessProfileComplete
                ? "Completed"
                : "Not Completed"}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-bold text-xl mb-4">
              Recent Chats
            </h2>

            {stats.recentChats.map((chat) => (
              <div
                key={chat._id}
                className="border-b py-2"
              >
                {chat.title}
              </div>
            ))}

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-bold text-xl mb-4">
              Recent Leads
            </h2>

            {stats.recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="border-b py-2"
              >
                {lead.name}
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;