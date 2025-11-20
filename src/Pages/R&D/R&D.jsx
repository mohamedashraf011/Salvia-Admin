import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/Domain";

function RAndD() {
  const navigate = useNavigate();

  const [pageData, setPageData] = useState({
    pageTitle: "Research & Development",
    introText: "",
  });
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch page data
        const pageRes = await fetch(`${base_url}/api/rnd/page`);
        const pageJson = await pageRes.json();
        setPageData({
          pageTitle: pageJson.pageTitle || "Research & Development",
          introText: pageJson.intro || "",
        });
        // Fetch sections
        const sectionsRes = await fetch(
          `${base_url}/api/rnd/sections`
        );
        const sectionsJson = await sectionsRes.json();
        setSections(sectionsJson.sections || []);
      } catch (err) {
        setError("Failed to load R&D data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (sectionId) => {
    navigate(`/r-and-d-preview/${sectionId}`);
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E6347] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading R&D data...</p>
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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Page Title
          </h2>
          <div className="w-[50%] px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            {pageData.pageTitle}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Intro</h2>
          <div className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg">
            {pageData.introText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section._id}
              className={`bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow ${
                section.name === "Commitment to Progress" ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {section.name}
                </h3>
                <p className="text-gray-700 mt-2">{section.details}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(section._id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RAndD;
