import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";
import { base_url } from "../../utils/Domain";
import { toast } from "../../Components/ui/sonner";

function AddCertificate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    certificateBody: "",
    certificateNumber: "",
    expiryDate: "",
    image: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.certificateBody.trim()) {
      toast.error("Please enter certification body");
      return;
    }

    if (!formData.certificateNumber.trim()) {
      toast.error("Please enter certificate number");
      return;
    }

    if (!formData.expiryDate) {
      toast.error("Please select expiry date");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload certificate image");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("certificateBody", formData.certificateBody);
    form.append("certificateNumber", formData.certificateNumber);
    form.append("expiryDate", formData.expiryDate);
    form.append("image", formData.image);

    try {
      await axios.post(`${base_url}/api/certificates`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Certificate added successfully!");
      setTimeout(() => {
        navigate("/certificates");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Add New Certificate
            </h1>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Certification Body
                  </label>
                  <input
                    type="text"
                    name="certificateBody"
                    value={formData.certificateBody || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                    placeholder="Type Certification body.."
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Certificate no
                  </label>
                  <input
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                    placeholder="Type Certificate no.."
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                    placeholder="Use YYYY-MM-DD (e.g., 2026-10-03)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg text-center bg-white transition-colors h-full flex items-center justify-center ${
                    isDragging
                      ? "border-green-700 bg-green-50"
                      : "border-gray-400 hover:border-gray-500"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                >
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-72 rounded-lg object-contain"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="certificate-image"
                      className="cursor-pointer"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="certificate-image"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <FiUploadCloud className="text-6xl text-gray-500 mb-3" />
                        <p className="text-sm text-gray-600">
                          <span className="text-blue-600 cursor-pointer">
                            Upload a file
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-20">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-8 py-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/certificates")}
                disabled={loading}
                className="text-black py-2 px-6 rounded-md cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCertificate;
