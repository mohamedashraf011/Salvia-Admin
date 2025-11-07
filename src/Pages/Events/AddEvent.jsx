import { useState } from "react";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";

function AddEvent() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        eventImage: file,
      }));
      setPreview(URL.createObjectURL(file));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Event
          </h1>
        </div>

        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
                    placeholder="Type Event Title.."
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
                    placeholder="Type Event Date.."
                  />
                </div>

                <div>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
                    placeholder="Type Event Location.."
                  />
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
                      : "border-gray-400 hover:border-gray-500"
                  }`}
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
                  />

                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
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
                        PNG, JPG, GIF up to 2MB
                      </p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                  placeholder="Type Event Description.."
                />
              </div>

              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Event Highlights
                </label>
                <textarea
                  name="eventHighlights"
                  value={formData.eventHighlights}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23]"
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
                rows="3"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23]"
                placeholder="Type Event Closing Line / CTA.."
              />
            </div>

            <div className="flex justify-center gap-4 pt-20">
              <button
                type="submit"
                className="bg-[#4E6347] hover:bg-[#253C26] text-white font-medium py-2 px-8 rounded-xl cursor-pointer"
              >
                Save
              </button>
              <Link
                to="/events"
                className="text-black px-8 py-3 font-medium cursor-pointer"
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
