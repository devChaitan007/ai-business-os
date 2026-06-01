import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function BusinessSetup() {
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    products: "",
    services: "",
    targetAudience: "",
    website: "",
  });

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    try {
      const res = await api.get("/business");

      if (res.data) {
        setFormData({
          businessName: res.data.businessName || "",
          industry: res.data.industry || "",
          products: res.data.products || "",
          services: res.data.services || "",
          targetAudience:
            res.data.targetAudience || "",
          website: res.data.website || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/business", formData);

      alert("Business Profile Saved");
    } catch (error) {
      console.log(error);
      alert("Error Saving Business");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-slate-100 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Business Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow max-w-3xl space-y-4"
        >

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="products"
            placeholder="Products"
            value={formData.products}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="services"
            placeholder="Services"
            value={formData.services}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="targetAudience"
            placeholder="Target Audience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded"
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default BusinessSetup;