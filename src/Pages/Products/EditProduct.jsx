import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import { base_url } from "../../utils/Domain";

export default function EditProduct() {
  const { productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      setFetchingData(true);
      setError(null);
      const res = await axios.get(`${base_url}/api/products/${productId}`);
      console.log(res);
      const product = res.data.product;

      if (!product) {
        setError("Product not found");
        return;
      }

      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
      });

      if (product.image) {
        const imageUrl = product.image.startsWith("http")
          ? product.image
          : `${base_url}${product.image}`;
        setExistingImageUrl(product.image);
        setImage(imageUrl);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product data");
      console.error("Error fetching product:", err);
    } finally {
      setFetchingData(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size must be less than 5MB",
        }));
        return;
      }
      setImageFile(file);
      setImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
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

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (existingImageUrl) {
        formDataToSend.append("image", existingImageUrl);
      }

      await axios.put(`${base_url}/api/products/${productId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
      console.error("Error updating product:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">Loading product data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="w-full min-h-screen bg-gray-100 flex justify-center py-10 px-4">
          <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow">
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Side */}
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-medium">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter product name"
                      className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-600 outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Product Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Enter product description"
                      className={`resize-none h-[300px] w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-600 outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-600 outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a category</option>
                      <option value="Seeds">Seeds</option>
                      <option value="Herbs">Herbs</option>
                      <option value="Dried Leaves">Dried Leaves</option>
                      <option value="Dried Flowers">Dried Flowers</option>
                      <option value="Oils">Oils</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  <label className="block mb-2 font-medium">
                    Product Image
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !loading && fileInputRef.current.click()}
                    className={`border-2 border-dashed rounded-lg h-80 flex items-center justify-center text-center p-4 bg-gray-50 cursor-pointer transition-colors relative ${
                      dragActive
                        ? "border-green-600 bg-green-50"
                        : errors.image
                        ? "border-red-500"
                        : "border-gray-400 hover:border-gray-500"
                    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {image ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={image}
                          alt="Preview"
                          className="h-full w-full object-contain rounded-lg"
                        />
                        {!loading && (
                          // <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center rounded-lg">
                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                              Click to change
                            </span>
                          // </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-600">
                        <FiUploadCloud className="w-12 h-12 mb-3 text-gray-400" />
                        <p className="text-blue-600 font-medium">
                          Upload a file
                        </p>
                        <p className="text-xs text-gray-500">
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      disabled={loading}
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  disabled={loading}
                  className="text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
