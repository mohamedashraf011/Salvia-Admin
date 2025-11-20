import React, { useState, useEffect } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { base_url } from "../../utils/Domain";

function Preview() {
  const navigate = useNavigate();
  const { blockId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [sectionData, setSectionData] = useState({
    sectionTitle: "",
    description: "",
  });

  // Load data from API based on blockId
  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${base_url}/api/about-us/sections`);
        const sections = (res.data && res.data.sections) || [];
        const target = sections.find((s) => String(s._id) === String(blockId));
        if (target) {
          setSectionData({ sectionTitle: target.name, description: target.details });
        } else {
          setMessage({ type: 'error', text: 'Section not found' });
        }
      } catch (error) {
        console.error('Error loading section:', error);
        setMessage({ type: 'error', text: 'Failed to load section. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    if (blockId) {
      fetchSection();
    }
  }, [blockId]);

  const handleSave = async () => {
    if (!sectionData.sectionTitle.trim() || !sectionData.description.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      const token = localStorage.getItem('token');
      await axios.put(
        `${base_url}/api/about-us/section`,
        {
          sectionId: blockId,
          sectionName: sectionData.sectionTitle,
          newDetails: sectionData.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: 'success', text: 'Section updated successfully!' });
      setTimeout(() => {
        navigate("/about");
      }, 1500);
    } catch (error) {
      console.error('Error saving section:', error);
      setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/about");
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#4E6347] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg">Loading section...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <FixedSidebar />

      {/* Main content area with margin for sidebar */}
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Section
          </h1>
          <p className="text-gray-600">Update section content</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Section Title */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Section Title
          </h2>
          <input
            type="text"
            value={sectionData.sectionTitle}
            onChange={(e) =>
              setSectionData({ ...sectionData, sectionTitle: e.target.value })
            }
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent transition-all"
            placeholder="Enter section title"
          />
        </div>

        {/* Description */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Description
          </h2>
          <textarea
            value={sectionData.description}
            onChange={(e) =>
              setSectionData({ ...sectionData, description: e.target.value })
            }
            rows={8}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical transition-all"
            placeholder="Enter section description..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          <button
            onClick={handleCancel}
            disabled={saving}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-[#4E6347] text-white rounded-lg hover:bg-[#5a7353] transition-colors font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
