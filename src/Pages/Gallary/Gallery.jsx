import { useState } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "../../Components/Delete";
import Gallary1 from "../../assets/images/Gallary1.png";
import Gallary2 from "../../assets/images/Gallary2.png";
import Gallary3 from "../../assets/images/Gallary3.png";
import Gallary4 from "../../assets/images/Gallary4.png";
import GalleryItemModal from "./GalleryItemModal";

const Gallery = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [galleryItems, setGalleryItems] = useState([
    { id: 1, type: "image", url: Gallary1, title: "Image 1" },
    { id: 2, type: "image", url: Gallary2, title: "Image 2" },
    { id: 3, type: "image", url: Gallary3, title: "Image 3" },
    { id: 4, type: "image", url: Gallary4, title: "Image 4" },
    { id: 5, type: "video", url: Gallary4, title: "Video 1" },
  ]);

  const handleAddItem = (newItem) => {
    setGalleryItems([...galleryItems, { ...newItem, id: Date.now() }]);
    setShowAddModal(false);
  };

  const handleUpdateItem = (updatedItem) => {
    setGalleryItems(
      galleryItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setGalleryItems(
      galleryItems.filter((item) => item.id !== selectedItem?.id)
    );
    setShowDeleteModal(false);
  };

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
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
            className="bg-[#4E6347] text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Add New Image
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative group">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video className="w-full h-full object-cover" controls>
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                <div className="absolute bottom-3 right-3 flex gap-2 transition-opacity">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowEditModal(true);
                    }}
                    className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors"
                  >
                    <FaRegEdit className="text-md text-white cursor-pointer" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteModal(true);
                    }}
                    className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors"
                  >
                    <RiDeleteBin6Line className="text-md text-white cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <GalleryItemModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
        />
      )}

      {showEditModal && selectedItem && (
        <GalleryItemModal
          item={selectedItem}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateItem}
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
