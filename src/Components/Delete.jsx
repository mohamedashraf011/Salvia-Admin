import { FaTimes } from "react-icons/fa";

function Delete({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-3xl p-12 max-w-md w-full mx-4 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="mt-4 text-center ">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Are You Sure
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            that You want remove this section
          </p>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-[#4E6347] text-white rounded-lg hover:bg-[#3a5230] transition-colors font-semibold cursor-pointer"
            >
              NO
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-white cursor-pointer"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
