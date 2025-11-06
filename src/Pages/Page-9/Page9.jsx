import React, { useState, useRef } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";

export default function Page9() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[260px] bg-gray-100 h-screen p-14">
        <div className="flex justify-between items-start mb-18">
          <div className="flex-1">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Page title
            </h2>
            <input
              type="text"
              value="Page 9"
              disabled
              className="w-[60%] px-4 py-2 bg-white border border-gray-300 rounded-md cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">Active :</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Description
            </h2>
            <textarea
              rows="12"
              placeholder="Type Short description.."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            ></textarea>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-3">Image</h2>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-400 bg-white rounded-xl flex flex-col items-center justify-center h-60 text-center p-2 relative cursor-pointer"
            >
              {image ? (
                <>
                  <img
                    src={image}
                    alt="preview"
                    className="object-cover h-full w-full rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl">
                    <span className="text-white text-sm font-medium">
                      Click to change
                    </span>
                  </div>
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
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-14">
          <button className="bg-[#4E6347] hover:bg-[#253C26] text-white font-medium py-2 px-8 rounded-xl cursor-pointer">
            Save
          </button>
          <button className="text-gray-700 font-medium cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
