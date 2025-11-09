import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Delete from "../../Components/Delete";
import FixedSidebar from "../../Components/FixedSidebar";
import anise from "../../assets/images/anise.png";
import artichoke from "../../assets/images/artichoke.png";
import basil from "../../assets/images/basil.png";
import caraway from "../../assets/images/caraway.png";

const Products = [
  {
    id: 1,
    name: "ANISE SEEDS",
    description: "PIMPINELLA ANISUM",
    image: anise,
  },
  {
    id: 2,
    name: "ARTICHOKE",
    description: "CYNARA SCOLYMUS",
    image: artichoke,
  },
  {
    id: 3,
    name: "BASIL",
    description: "OCIMUM BASILICUM",
    image: basil,
  },
  {
    id: 4,
    name: "CARAWAY SEEDS",
    description: "MATRICARIA CHAMOMILLA",
    image: caraway,
  },
];

export default function Product() {
  const [products, setProducts] = useState(Products);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setShowDeleteModal(false);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="flex">
      <FixedSidebar />

      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        <div className="flex justify-between items-center mb-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Page title
            </h2>
            <input
              type="text"
              value="Products"
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-[#4E6347] text-white px-4 py-2 rounded-lg hover:bg-[#3a5230] transition-colors cursor-pointer"
          >
            Add New Product
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-[60%] pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4E6347] focus:border-transparent"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-3xl shadow-md overflow-hidden flex flex-col items-center border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute top-3 right-3 flex gap-2 transition-opacity">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors"
                >
                  <FaRegEdit className="text-md text-white cursor-pointer" />
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors"
                >
                  <RiDeleteBin6Line className="text-md text-white cursor-pointer" />
                </button>
              </div>

              <div className="flex justify-center items-center bg-white p-5 h-auto mt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-46 w-auto object-contain"
                />
              </div>

              <div className="w-[90%] bg-[#4E6347] text-white rounded-xl py-4 px-2 text-center mb-5 mt-2 shadow-sm transition-all duration-300 group-hover:bg-[#58754E]">
                <h3 className="font-bold text-lg uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="font-light italic tracking-wide mt-1 opacity-95 text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found. Try a different search term or add a new
              product.
            </p>
          </div>
        )}
      </div>

      <Delete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(selectedProduct?.id)}
        itemName={`"${selectedProduct?.name}"`}
      />
    </div>
  );
}
