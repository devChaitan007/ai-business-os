import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import BusinessSetup from "./pages/BusinessSetup";
import EmailWriter from "./pages/EmailWriter";
import ProposalGenerator from "./pages/ProposalGenerator";
import SocialMediaGenerator from "./pages/SocialMediaGenerator";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import CRM from "./pages/CRM";
import KnowledgeBase from "./pages/KnowledgeBase";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />
        <Route
  path="/business"
  element={
    <ProtectedRoute>
      <BusinessSetup />
    </ProtectedRoute>
  }
/>
<Route
  path="/email-writer"
  element={
    <ProtectedRoute>
      <EmailWriter />
    </ProtectedRoute>
  }
/>
<Route
  path="/proposal-generator"
  element={
    <ProtectedRoute>
      <ProposalGenerator />
    </ProtectedRoute>
  }
/>
<Route
  path="/social-media"
  element={
    <ProtectedRoute>
      <SocialMediaGenerator />
    </ProtectedRoute>
  }
/>
<Route
  path="/invoice-generator"
  element={
    <ProtectedRoute>
      <InvoiceGenerator />
    </ProtectedRoute>
  }
/>
<Route
  path="/knowledge-base"
  element={
    <ProtectedRoute>
      <KnowledgeBase />
    </ProtectedRoute>
  }
/>
<Route
  path="/crm"
  element={
    <ProtectedRoute>
      <CRM />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;