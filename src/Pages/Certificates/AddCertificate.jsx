import { useState } from "react";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";

function AddCertificate() {
  const [formData, setFormData] = useState({
    certificationBody: "",
    certificateNumber: "",
    expiryDate: "",
    certificateImage: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);

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
        certificateImage: file,
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
        certificateImage: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
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
              {/* LEFT SIDE INPUTS */}
              <div className="space-y-6">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Certification Body
                  </label>
                  <input
                    type="text"
                    name="certificationBody"
                    value={formData.certificationBody}
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
                    value={formData.certificateNumber}
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
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                    placeholder="Type Expiry date"
                  />
                </div>
              </div>

              {/* RIGHT SIDE IMAGE UPLOAD */}
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
                    <label htmlFor="certificate-image" className="cursor-pointer">
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

            {/* BUTTONS */}
            <div className="flex justify-center gap-4 pt-20">
              <button
                type="submit"
                className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-8 py-2 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Save
              </button>
              <Link
                to="/certificates"
                className="text-black py-2 px-6 rounded-md cursor-pointer"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCertificate;
