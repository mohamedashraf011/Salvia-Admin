import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Delete from "../../Components/Delete";
import FixedSidebar from "../../Components/FixedSidebar";
import { base_url } from "../../utils/Domain";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updatedProduct) {
      const updated = location.state.updatedProduct;
      setProducts((prev) =>
        prev.map((p) =>
          p.id === updated.id
            ? {
                ...p,
                name: updated.productName,
                description: updated.description,
                image: updated.productImage,
              }
            : p
        )
      );
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${base_url}/api/products`);
        setProducts(res.data.products || []);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${base_url}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== productId));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      console.error("Error deleting product:", err);
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleEditProduct = (productId) => {
    console.log("Editing product with ID:", productId);
    navigate(`/edit-product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[180px] p-5 md:ml-[260px] bg-gray-100 min-h-screen md:p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E6347] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
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
        <div className="flex justify-between flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/2 flex md:block">
            <h2 className="text-xl md:text-2xl w-25 md:w-auto font-semibold text-gray-800 mb-3">
              Page title
            </h2>
            <input
              type="text"
              value="Products"
              readOnly
              className="md:w-full px-1 py-0 md:px-3 md:py-2 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-[#4E6347] text-white px-4 py-2 rounded-lg hover:bg-[#3a5230] transition-colors cursor-pointer mt-4 md:mt-0"
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
              key={product._id}
              className="relative group bg-white rounded-3xl shadow-md overflow-hidden flex flex-col items-center border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEditProduct(product._id)}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2 transition-colors"
                >
                  <FaRegEdit className="text-md text-white cursor-pointer" />
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-2"
                >
                  <RiDeleteBin6Line className="text-md text-white cursor-pointer" />
                </button>
              </div>

              <div className="flex justify-center items-center bg-white p-5 h-auto mt-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-46 w-auto object-contain"
                  onError={(e) => {
                    e.target.src = "";
                  }}
                />
              </div>

              <div className="w-[90%] bg-[#4E6347] text-white rounded-xl py-4 px-2 text-center mb-5 mt-2 shadow-sm transition-all duration-300 group-hover:bg-[#58754E]">
                <h3 className="font-bold text-lg uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="font-light italic tracking-wide mt-1 opacity-95 text-sm">
                  {product.shortDescription || product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">No products found.</div>
        )}
      </div>

      <Delete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(selectedProduct?._id)}
        itemName={`"${selectedProduct?.name}"`}
      />
    </div>
  );
}
