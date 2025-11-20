import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

const GalleryItemModal = ({
  item,
  onClose,
  onSubmit,
  loading = false,
  isEdit = false,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(item?.image || "");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
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

    if (!isEdit && !selectedFile) {
      setError("Please select an image");
      return;
    }

    if (isEdit && !selectedFile) {
      setError("Please select a new image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    if (isEdit) {
      onSubmit(item._id, formData);
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
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-gray-700 font-medium mb-4">Image</label>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

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
            ${preview ? "p-2" : "p-10"}`}
            onClick={() => !loading && fileInputRef.current.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto rounded-md max-h-48 w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FiUploadCloud className="text-6xl text-gray-500 mb-3" />
                <p className="text-gray-500">
                  <span className="text-[#4E6347] font-medium">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              disabled={loading}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#4E6347] text-white rounded-lg hover:bg-[#3a5230] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="text-black py-2 px-6 rounded-md cursor-pointer hover:bg-gray-100 disabled:opacity-50"
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
