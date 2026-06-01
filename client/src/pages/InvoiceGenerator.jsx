import { useState } from "react";
import { jsPDF } from "jspdf";
import Sidebar from "../components/Sidebar";

function InvoiceGenerator() {
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("INVOICE", 20, 20);

    doc.setFontSize(12);

    doc.text(`Client: ${clientName}`, 20, 40);
    doc.text(`Service: ${service}`, 20, 50);
    doc.text(`Amount: ₹${amount}`, 20, 60);

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      70
    );

    doc.line(20, 80, 180, 80);

    doc.text(
      "Thank you for your business.",
      20,
      100
    );

    doc.save(
      `Invoice-${clientName || "Client"}.pdf`
    );
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Invoice Generator
        </h1>

        <div className="bg-white p-6 rounded-xl shadow max-w-3xl">

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
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full border p-3 rounded"
            />

            <button
              onClick={generatePDF}
              className="bg-indigo-600 text-white px-6 py-3 rounded"
            >
              Download Invoice PDF
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default InvoiceGenerator;