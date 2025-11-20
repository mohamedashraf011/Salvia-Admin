import React, { useState } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { Link } from "react-router-dom";
import { base_url } from "../../utils/Domain";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Seeds",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${base_url}/api/products`, {
        method: "POST",
        body: data,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + (errorData.message || "Failed to add product"));
        return;
      }
      const result = await response.json();
      alert("Product added successfully!");
      // Optionally reset form or redirect
      setFormData({ name: "", description: "", category: "", image: null });
      setImagePreview(null);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 w-full"
        >
          <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-600 mb-6 font-semibold">Card Details</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Type product name.."
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Product Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product description.."
                  className="resize-none h-[300px] w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                >
                  <option value="Seeds">Seeds</option>
                  <option value="Tools">Tools</option>
                  <option value="Plants">Plants</option>
                  <option value="Fertilizers">Fertilizers</option>
                </select>
              </div>
            </div>

            {/* Right side - Image Upload */}
            <div className="flex flex-col justify-center">
              <label className="block text-gray-700 font-medium mb-2">
                Product Image
              </label>
              <div className="flex justify-center items-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-75 bg-white rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition duration-300"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6 text-center">
                    <svg
                      className="w-8 h-8 mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m10 8v4m0 0l4-4m-4 4l-4-4"
                      ></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      <span className="text-green-600 font-medium">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="flex justify-center items-center mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-2 rounded-md"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
