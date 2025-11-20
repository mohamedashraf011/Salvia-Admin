import React, { useState, useEffect } from "react";
import axios from "axios";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";
import {base_url} from "../../utils/Domain"

function Preview() {
  const navigate = useNavigate();
  const { blockId } = useParams();

  const [sectionData, setSectionData] = useState({
    sectionName: "",
    newDetails: "",
    sectionId: blockId,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${base_url}/api/rnd/sections`);
        const sections = res.data.sections || [];
        const found = sections.find(
          (sec) => String(sec._id) === String(blockId)
        );
        if (found) {
          setSectionData({
            sectionName: found.name,
            newDetails: found.details,
            sectionId: found._id,
          });
        } else {
          setError("Section not found.");
        }
      } catch (err) {
        setError("Failed to load section data.");
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId]);

  const handleSave = async () => {
    setError(null);
    setSuccessMsg(null);
    setIsSaving(true);
    let token = localStorage.getItem("token");
    let headers = {
      Authorization: `${token}`,
    };
    try {
      await axios.put(`${base_url}/api/rnd/section`, sectionData, {headers});
      setSuccessMsg("Section saved successfully!");
      setTimeout(() => navigate("/r-and-d"), 800);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save section.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/r-and-d");
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E6347] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading section data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Section</h1>

        {successMsg && (
          <div
            className="mb-6 text-green-700 bg-green-100 px-4 py-3 rounded"
            role="status"
            aria-live="polite"
          >
            {successMsg}
          </div>
        )}
        {error && (
          <div
            className="mb-6 text-red-700 bg-red-100 px-4 py-3 rounded"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Section Title
          </h2>
          <input
            type="text"
            value={sectionData.sectionName}
            onChange={(e) =>
              setSectionData({ ...sectionData, sectionName: e.target.value })
            }
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
            placeholder="Enter section title"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Description
          </h2>
          <textarea
            value={sectionData.newDetails}
            onChange={(e) =>
              setSectionData({ ...sectionData, newDetails: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter description"
          />
        </div>

        <div className="flex gap-4 mt-12 justify-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            aria-disabled={isSaving}
            className={`px-4 py-3 rounded-lg transition-colors font-semibold cursor-pointer ${
              isSaving
                ? "bg-gray-400 text-gray-800"
                : "bg-[#4E6347] text-white hover:bg-[#5a7353]"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
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
