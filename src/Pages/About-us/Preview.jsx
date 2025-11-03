import React, { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { base_url } from "../../utils/Domain";

function Preview() {
  const navigate = useNavigate();
  const { blockId } = useParams();

  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    description: "",
  });

  // Load data from API based on blockId
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.get(`${base_url}/api/about-us/sections`);
        const sections = (res.data && res.data.sections) || [];
        const target = sections.find((s) => String(s._id) === String(blockId));
        if (target) {
          setSectionData({ sectionTitle: target.name, description: target.details });
        }
      } catch (error) {
        console.error('Error loading section:', error);
      }
    };
    fetchSection();
  }, [blockId]);

  const handleSave = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGVmMGYzMjk4MTNkMDFhN2QwYmRiZSIsImlhdCI6MTc2MjE5NzM4NywiZXhwIjoxNzYyMjAwOTg3fQ.boYzJFomxORLkZkVHZgRmxNgm3I0-p9Qc9SzFpSlLWU';
      await axios.put(
        `${base_url}/api/about-us/section`,
        {
          sectionId: blockId,
          sectionName: sectionData.sectionTitle,
          newDetails: sectionData.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/about");
    } catch (error) {
      console.error('Error saving section:', error);
    }
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
