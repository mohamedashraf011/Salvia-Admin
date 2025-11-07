import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

const GalleryItemModal = ({ item, onClose, onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    type: item?.type || "image",
    title: item?.title || "",
    file: null,
    preview: item?.url || "",
  });

  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        file,
        preview: reader.result,
        type: file.type.startsWith("video") ? "video" : "image",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onSubmit({ ...item, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Image" : "Add Image"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-gray-700 font-medium mb-4">Image</label>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl text-center transition-all cursor-pointer 
            ${dragActive ? "border-[#4E6347] bg-green-50" : "border-gray-300"} 
            ${formData.preview ? "p-2" : "p-10"}`}
            onClick={() => fileInputRef.current.click()}
          >
            {formData.preview ? (
              formData.type === "video" ? (
                <video
                  src={formData.preview}
                  controls
                  className="mx-auto rounded-md max-h-48 w-full"
                />
              ) : (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="mx-auto rounded-md max-h-48 w-full"
                />
              )
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <FiUploadCloud className="text-6xl text-gray-500 mb-3" />
                  <p className="text-gray-500">
                    <span className="text-[#4E6347] font-medium">
                      Upload a file
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG, GIF, MP4 up to 2MB
                  </p>
                </div>
              </>
            )}

            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4E6347] text-white rounded-lg hover:bg-[#3a5230] cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-black py-2 px-6 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryItemModal;
