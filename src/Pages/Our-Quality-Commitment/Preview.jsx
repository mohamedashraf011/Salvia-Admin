import React, { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";

function Preview() {
  const navigate = useNavigate();
  const { blockId } = useParams();

  // Mock data - In production, this will come from API
  const allBlocksData = {
    1: {
      sectionTitle: "Food Safety & Compliance",
      description:
        "We adhere to stringent international food safety standards and regulations. Our products are tested and certified to ensure compliance with FDA, EU, and other global food safety requirements.",
    },
    2: {
      sectionTitle: "Pesticides & Heavy Metals",
      description:
        "Every batch undergoes rigorous testing for pesticide residues and heavy metal contamination to ensure products are safe for consumption.",
    },
    3: {
      sectionTitle: "Microbiology, Yeasts & Moulds",
      description:
        "Comprehensive microbiological testing ensures our herbs are free from harmful bacteria, yeasts, and moulds that could compromise quality and safety.",
    },
    4: {
      sectionTitle: "Moisture Content",
      description:
        "Optimal moisture levels are maintained through careful drying and storage processes to preserve quality and extend shelf life.",
    },
    5: {
      sectionTitle: "Pyrrolizidine Alkaloids (PAs) & PAHs",
      description:
        "Advanced testing protocols detect and eliminate potentially harmful alkaloids and polycyclic aromatic hydrocarbons.",
    },
    6: {
      sectionTitle: "Packaging & Integrity",
      description:
        "Protective, food-grade packaging preserves freshness and ensures products reach customers in optimal condition.",
    },
    7: {
      sectionTitle: "Continuous Improvement",
      description:
        "We continually refine our processes and adopt the latest quality assurance technologies to exceed industry standards.",
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
    //     navigate('/our-quality');
    //   } catch (error) {
    //     console.error('Error saving data:', error);
    //   }
    // };
    // saveData();
    console.log("Saving data:", sectionData);
    navigate("/our-quality");
  };

  const handleCancel = () => {
    navigate("/our-quality");
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
