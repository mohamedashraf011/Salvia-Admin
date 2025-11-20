import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { base_url } from "../../utils/Domain";

function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    eventHighlights: "",
    eventClosingLineCTA: "",
    eventImage: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          eventImage: "Please select an image file",
        }));
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          eventImage: "File size must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        eventImage: file,
      }));
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, eventImage: "" }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.eventTitle.trim()) {
      newErrors.eventTitle = "Event title is required";
    }
    if (!formData.eventDate.trim()) {
      newErrors.eventDate = "Event date is required";
    }
    if (!formData.eventLocation.trim()) {
      newErrors.eventLocation = "Event location is required";
    }
    if (!formData.eventDescription.trim()) {
      newErrors.eventDescription = "Event description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.eventTitle);
      formDataToSend.append("date", formData.eventDate);
      formDataToSend.append("location", formData.eventLocation);
      formDataToSend.append("description", formData.eventDescription);
      formDataToSend.append("highlights", formData.eventHighlights);
      formDataToSend.append("cta", formData.eventClosingLineCTA);

      if (formData.eventImage) {
        formDataToSend.append("image", formData.eventImage);
      }

      await axios.post(`${base_url}/api/events`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Event
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleInputChange}
                    disabled={loading}
                    className={`w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.eventTitle ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Type Event Title.."
                  />
                  {errors.eventTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventTitle}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    disabled={loading}
                    className={`w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.eventDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    disabled={loading}
                    className={`w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.eventLocation
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Type Event Location.."
                  />
                  {errors.eventLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.eventLocation}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Event Image
                </label>

                <div
                  className={`border-2 border-dashed rounded-lg text-center transition-colors h-64 flex flex-col items-center justify-center bg-white cursor-pointer relative overflow-hidden ${
                    dragActive
                      ? "border-[#293A23] bg-[#F9FFF6]"
                      : errors.eventImage
                      ? "border-red-500"
                      : "border-gray-400 hover:border-gray-500"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                    className="hidden"
                    id="event-image"
                    disabled={loading}
                  />

                  {preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                      {!loading && (
                        <label
                          htmlFor="event-image"
                          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all cursor-pointer flex items-center justify-center"
                        >
                          <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
                            Change Image
                          </span>
                        </label>
                      )}
                    </div>
                  ) : (
                    <label
                      htmlFor="event-image"
                      className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                    >
                      <FiUploadCloud className="text-gray-400 text-5xl mb-2" />
                      <p className="text-sm text-blue-500">
                        Upload a file{" "}
                        <span className="text-gray-600">or drag and drop</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </label>
                  )}
                </div>
                {errors.eventImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventImage}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Event Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows="4"
                  className={`w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.eventDescription
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Type Event Description.."
                />
                {errors.eventDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventDescription}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Event Highlights
                </label>
                <textarea
                  name="eventHighlights"
                  value={formData.eventHighlights}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Type Event Highlights.."
                />
              </div>
            </div>

            <div className="mt-10">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Event Closing Line / CTA
              </label>
              <textarea
                name="eventClosingLineCTA"
                value={formData.eventClosingLineCTA}
                onChange={handleInputChange}
                disabled={loading}
                rows="3"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Type Event Closing Line / CTA.."
              />
            </div>

            <div className="flex justify-center gap-4 pt-20">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4E6347] hover:bg-[#253C26] text-white font-medium py-2 px-8 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <Link
                to="/events"
                className={`text-black px-8 py-3 font-medium cursor-pointer hover:bg-gray-200 rounded-xl ${
                  loading ? "pointer-events-none opacity-50" : ""
                }`}
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

export default AddEvent;
