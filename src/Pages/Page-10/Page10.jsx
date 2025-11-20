import React, { useState, useRef, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { base_url } from "../../utils/Domain";

export default function Page10() {
  const [formData, setFormData] = useState({
    pageTitle: "",
    description: "",
    active: true,
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchShowcaseData();
  }, []);

  const fetchShowcaseData = async () => {
    try {
      setFetchingData(true);
      setError(null);
      const res = await axios.get(
        `${base_url}/api/site-showcase-two/showcase-two`
      );
      const data = res.data;

      setFormData({
        pageTitle: data.pageTitle || "",
        description: data.description || "",
        active: data.active !== undefined ? data.active : true,
      });

      if (data.mainImageUrl) {
        setExistingImageUrl(data.mainImageUrl);
        setImage(data.mainImageUrl);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch showcase data");
      console.error("Error fetching showcase:", err);
    } finally {
      setFetchingData(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      active: e.target.checked,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("pageTitle", formData.pageTitle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("active", formData.active);

      if (imageFile) {
        formDataToSend.append("mainImage", imageFile);
      }

      const res = await axios.put(
        `${base_url}/api/site-showcase-two/showcase-two`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Showcase updated successfully!");
      setImageFile(null);

      if (res.data.mainImageUrl) {
        setExistingImageUrl(res.data.mainImageUrl);
      }

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update showcase");
      console.error("Error updating showcase:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchShowcaseData();
    setImageFile(null);
    setError(null);
    setSuccess(null);
  };

  if (fetchingData) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">
              Loading showcase data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-start mb-10">
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Page title
              </h2>
              <input
                type="text"
                name="pageTitle"
                value={formData.pageTitle}
                onChange={handleInputChange}
                disabled={loading}
                className="w-[75%] px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter page title"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">Active :</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={handleToggleChange}
                  disabled={loading}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Description
              </h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
                rows="12"
                placeholder="Type description.."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-3">Image</h2>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => !loading && fileInputRef.current.click()}
                className={`border-2 border-dashed border-gray-400 bg-white rounded-xl flex flex-col items-center justify-center h-60 text-center p-2 relative cursor-pointer hover:border-gray-500 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="preview"
                      className="object-cover h-full w-full rounded-xl"
                    />
                    {!loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl">
                        <span className="text-white text-sm font-medium">
                          Click to change
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FiUploadCloud className="text-6xl text-gray-500 mb-3" />
                    <p className="text-sm text-gray-600">
                      <span className="text-blue-600 cursor-pointer">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-14">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4E6347] hover:bg-[#253C26] text-white font-medium py-2 px-8 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="text-gray-700 font-medium cursor-pointer hover:bg-gray-200 px-8 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
