import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";
import { use } from "react";
import { base_url } from "../../utils/Domain";

function EditCertificate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    certificateBody: "",
    certificateNumber: "",
    expiryDate: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${base_url}/api/certificates/${id}`);
        const cert = res.data.certificate;
        setFormData({
          certificateBody: cert.certificateBody || "",
          certificateNumber: cert.certificateNumber || "",
          expiryDate: cert.expiryDate ? cert.expiryDate.slice(0, 10) : "",
          image: null,
        });
        setPreview(cert.image || null);
      } catch (err) {
        setError("Failed to load certificate data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file (PNG, JPG, GIF).");
    }
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const form = new FormData();
    form.append("certificateBody", formData.certificateBody);
    form.append("certificateNumber", formData.certificateNumber);
    form.append("expiryDate", formData.expiryDate);
    if (formData.image) {
      form.append("image", formData.image);
    }
    axios
      .put(`${base_url}/api/certificates/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSuccess("Certificate updated successfully.");
        if (res.data.certificate.image) {
          setPreview(res.data.certificate.image);
        }
      })
      .catch(() => {
        setError("Failed to update certificate.");
      });
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Certificate
          </h1>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="text-2xl text-center py-12">
              Loading certificate...
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
              {error}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">
                      Certification body
                    </label>
                    <input
                      type="text"
                      name="certificateBody"
                      value={formData.certificateBody}
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
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                      placeholder="Type Expired date"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Certificate Image
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg text-center bg-white transition-colors h-full flex flex-col items-center justify-center p-4 ${
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
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="certificate-image"
                    />
                    {preview ? (
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-72 rounded-lg object-contain"
                        />
                        <label
                          htmlFor="certificate-image"
                          className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          Change Image
                        </label>
                      </div>
                    ) : (
                      <label
                        htmlFor="certificate-image"
                        className="cursor-pointer"
                      >
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
              {success && (
                <div className="text-green-700 text-center py-2 mt-7 font-bold">
                  {success}
                </div>
              )}
              {error && (
                <div className="text-red-700 text-center py-2">{error}</div>
              )}
              <div className="flex justify-center gap-4 pt-20">
                <button
                  type="submit"
                  className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-8 py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
                <Link
                  to="/certificates"
                  className="text-black py-2 px-6 rounded-md cursor-pointer"
                >
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCertificate;
