import { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "../../Components/Delete";
import GalleryItemModal from "./GalleryItemModal";
import axios from "axios";
import { base_url } from "../../utils/Domain";

const Gallery = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${base_url}/api/gallery`);
      setGalleryItems(res.data.images || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch gallery items");
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${base_url}/api/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setGalleryItems([...galleryItems, res.data]);
      setShowAddModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add image");
      console.error("Error adding image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, formData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(`${base_url}/api/gallery/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setGalleryItems(
        galleryItems.map((item) => (item._id === id ? res.data : item))
      );
      setShowEditModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update image");
      console.error("Error updating image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${base_url}/api/gallery/${selectedItem._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryItems(
        galleryItems.filter((item) => item._id !== selectedItem._id)
      );
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete image");
      console.error("Error deleting image:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Page Title
            </h2>
            <input
              type="text"
              value="Gallery"
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            disabled={loading}
            className="bg-[#4E6347] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#3a5230] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add New Image
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && galleryItems.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">Loading gallery...</div>
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">
              No images yet. Add your first image!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt="Gallery item"
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowEditModal(true);
                      }}
                      disabled={loading}
                      className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors disabled:opacity-50"
                    >
                      <FaRegEdit className="text-md text-white cursor-pointer" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowDeleteModal(true);
                      }}
                      disabled={loading}
                      className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors disabled:opacity-50"
                    >
                      <RiDeleteBin6Line className="text-md text-white cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <GalleryItemModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
          loading={loading}
        />
      )}

      {showEditModal && selectedItem && (
        <GalleryItemModal
          item={selectedItem}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateItem}
          loading={loading}
          isEdit
        />
      )}

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Gallery;
