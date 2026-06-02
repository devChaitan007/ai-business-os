import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard");
      setStats(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="text-xl font-semibold">
            Loading dashboard...
          </div>
        </div>
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

        {/* STATS GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Total Chats
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalChats}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Total Leads
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              New Leads
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.newLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Won Leads
            </h2>
            <p className="text-4xl font-bold mt-2 text-green-600">
              {stats.wonLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Lost Leads
            </h2>
            <p className="text-4xl font-bold mt-2 text-red-600">
              {stats.lostLeads}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Knowledge Docs
            </h2>
            <p className="text-4xl font-bold mt-2">
              {stats.totalKnowledge}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold">
              Business Profile
            </h2>
            <p className="text-xl mt-3">
              {stats.businessProfileComplete
                ? "Completed"
                : "Not Completed"}
            </p>
          </div>

        </div>

        {/* RECENT SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* RECENT CHATS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl mb-4">
              Recent Chats
            </h2>

            {stats.recentChats.length === 0 ? (
              <p className="text-gray-500">
                No chats yet
              </p>
            ) : (
              stats.recentChats.map((chat) => (
                <div
                  key={chat._id}
                  className="border-b py-2"
                >
                  {chat.title}
                </div>
              ))
            )}
          </div>

          {/* RECENT LEADS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-xl mb-4">
              Recent Leads
            </h2>

            {stats.recentLeads.length === 0 ? (
              <p className="text-gray-500">
                No leads yet
              </p>
            ) : (
              stats.recentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="border-b py-2 flex justify-between"
                >
                  <span>{lead.name}</span>
                  <span className="text-sm font-medium">
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;