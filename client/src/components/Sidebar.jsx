import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-slate-800"
    }`;

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">

      <h1 className="text-2xl font-bold mb-8">
        AI Business OS
      </h1>

      {/* Navigation */}
      <div className="space-y-2 flex-1">

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/ai-chat"
          className={linkClass}
        >
          AI Assistant
        </NavLink>

        <NavLink
          to="/business"
          className={linkClass}
        >
          Business Profile
        </NavLink>

        <NavLink
          to="/email-writer"
          className={linkClass}
        >
          Email Writer
        </NavLink>
        <NavLink
          to="/proposal-generator"
          className={linkClass}
        >
           Proposal Generator
        </NavLink>

        <NavLink
          to="/social-media"
          className={linkClass}
        >
          Social Media Generator
       </NavLink>

       <NavLink
          to="/invoice-generator"
          className={linkClass}
        >
         Invoice Generator
      </NavLink>

      <NavLink
        to="/crm"
        className={linkClass}
      >
        CRM
    </NavLink>
    <NavLink
       to="/knowledge-base"
       className={linkClass}
    >
       Knowledge Base
    </NavLink>

      </div>

      {/* Logout */}
      <div className="mt-6 pt-4 border-t border-slate-700">

        <button
          onClick={logout}
          className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;