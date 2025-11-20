import { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { toast } from "../../components/ui/sonner";
import { base_url } from "../../utils/Domain";

export default function Contact() {
  const [formData, setFormData] = useState({
    pageTitle: "",
    description: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch(
        `${base_url}/api/contact-us/site-info`
      );
      const data = await response.json();
      setFormData({
        pageTitle: data.pageTitle,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
      });
    } catch (error) {
      console.error("Error fetching contact data:", error);
      toast.error("Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${base_url}/api/contact-us/site-info`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Contact information updated successfully");
      } else {
        toast.error("Failed to update contact information");
      }
    } catch (error) {
      console.error("Error updating contact data:", error);
      toast.error("Failed to update contact information");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchContactData();
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 h-screen">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Page title
          </h2>
          <input
            type="text"
            name="pageTitle"
            value={formData.pageTitle}
            disabled
            className="w-[50%] px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Description
          </h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Address
            </h2>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Phone</h2>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Email</h2>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
          />
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#4E6347] hover:bg-[#293A23] text-white py-2 px-6 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            disabled={saving}
            className="text-black py-2 px-6 rounded-md cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
