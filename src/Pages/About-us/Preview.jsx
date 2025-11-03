import React, { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  const { blockId } = useParams();

  // Mock data - In production, this will come from API
  const allBlocksData = {
    1: {
      sectionTitle: "Our Mission",
      description:
        "Our mission is to deliver products that combine authenticity, purity, and consistency. Every step of our process - from carefully selecting raw materials at the farm level, to applying rigorous processing and quality control measures - is designed to meet international food safety and quality standards.",
    },
    2: {
      sectionTitle: "Sustainability & Community",
      description:
        "We are committed to sustainable farming practices and building strong relationships with local communities. Our approach ensures that we support the livelihoods of farmers while protecting the environment for future generations.",
    },
    3: {
      sectionTitle: "Our Reputation",
      description:
        "Built on trust and excellence, our reputation speaks for itself. We have established long-term partnerships with clients worldwide who rely on us for consistently high-quality natural products.",
    },
    4: {
      sectionTitle: "Our Vision",
      description:
        "Our vision is to become the leading global supplier of premium dried herbs and botanicals, recognized for our commitment to quality, sustainability, and innovation in the natural products industry.",
    },
  };

  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    description: "",
  });

  // Load data based on blockId
  useEffect(() => {
    const blockData = allBlocksData[blockId];
    if (blockData) {
      setSectionData(blockData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId]);

  // TODO: Fetch data from API - uncomment when API is ready
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`YOUR_API_ENDPOINT_HERE/${blockId}`);
  //       setSectionData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, [blockId]);

  const handleSave = () => {
    // TODO: Save data to API
    // const saveData = async () => {
    //   try {
    //     await axios.put(`YOUR_API_ENDPOINT_HERE/${blockId}`, sectionData);
    //     alert('Changes saved successfully!');
    //     navigate('/about');
    //   } catch (error) {
    //     console.error('Error saving data:', error);
    //   }
    // };
    // saveData();
    console.log("Saving data:", sectionData);
    navigate("/about");
  };

  const handleCancel = () => {
    navigate("/about");
  };

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <FixedSidebar />

      {/* Main content area with margin for sidebar */}
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        {/* Preview Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Preview</h1>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Section tittle
          </h2>
          <input
            type="text"
            value={sectionData.sectionTitle}
            onChange={(e) =>
              setSectionData({ ...sectionData, sectionTitle: e.target.value })
            }
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
            placeholder="Enter section title"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">tittle</h2>
          <textarea
            value={sectionData.description}
            onChange={(e) =>
              setSectionData({ ...sectionData, description: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter description"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12 justify-center">
          <button
            onClick={handleSave}
            className="px-4 py-3 bg-[#4E6347] text-white rounded-lg hover:bg-[#5a7353] transition-colors font-semibold cursor-pointer"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
