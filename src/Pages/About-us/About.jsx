import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/Domain";
import axios from 'axios';

function About() {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState(null);

  const [pageData, setPageData] = useState({
    pageTitle: "About Us",
    introTitle: "Intro tittle",
    introText:
      "At Salvia Naturals, we take pride in being a trusted supplier and exporter of high-quality dried herbs and botanicals. With a strong base in Egypt, our operations extend across some of the most fertile and diverse agricultural regions - from the northern fields of Egypt to the rich and unique landscapes of central and southern Sudan. This wide sourcing network allows us to provide a diverse portfolio of herbs with distinctive qualities, reflecting the natural richness of the Nile Valley.",
    contentBlocks: [
      {
        id: 1,
        title: "Our Mission",
        sectionTitle: "Our Mission",
        description:
          "Our mission is to deliver products that combine authenticity, purity, and consistency. Every step of our process - from carefully selecting raw materials at the farm level, to applying rigorous processing and quality control measures - is designed to meet international food safety and quality standards.",
      },
      {
        id: 2,
        title: "Sustainability & Community",
        sectionTitle: "Sustainability & Community",
        description:
          "We are committed to sustainable farming practices and building strong relationships with local communities. Our approach ensures that we support the livelihoods of farmers while protecting the environment for future generations.",
      },
      {
        id: 3,
        title: "Our Reputation",
        sectionTitle: "Our Reputation",
        description:
          "Built on trust and excellence, our reputation speaks for itself. We have established long-term partnerships with clients worldwide who rely on us for consistently high-quality natural products.",
      },
      {
        id: 4,
        title: "Our Vision",
        sectionTitle: "Our Vision",
        description:
          "Our vision is to become the leading global supplier of premium dried herbs and botanicals, recognized for our commitment to quality, sustainability, and innovation in the natural products industry.",
      },
    ],
  });

  const handleEdit = (blockId) => {
    navigate(`/preview/${blockId}`);
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [pageRes, sectionsRes] = await Promise.all([
          axios.get(`${base_url}/api/about-us/page`),
          axios.get(`${base_url}/api/about-us/sections`)
        ]);

        const page = pageRes.data || {};
        const sections = (sectionsRes.data && sectionsRes.data.sections) || [];

        setPageData({
          pageTitle: page.pageTitle || "About Us",
          introTitle: "Intro tittle",
          introText: page.intro || "",
          contentBlocks: sections.map((sec) => ({
            id: sec._id,
            title: sec.name,
            sectionTitle: sec.name,
            description: sec.details,
          })),
        });
      } catch (error) {
        console.error('Error fetching About Us data:', error);
      }
    };
    fetchAboutData();
  }, []);

  const handleSaveIntro = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGVmMGYzMjk4MTNkMDFhN2QwYmRiZSIsImlhdCI6MTc2MjE5NzM4NywiZXhwIjoxNzYyMjAwOTg3fQ.boYzJFomxORLkZkVHZgRmxNgm3I0-p9Qc9SzFpSlLWU';
      await axios.put(
        `${base_url}/api/about-us/page`,
        { pageTitle: pageData.pageTitle, intro: pageData.introText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Optionally, show a toast or message
    } catch (error) {
      console.error('Error saving About Us page:', error);
    }
  };

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <FixedSidebar />

      {/* Main content area with margin for sidebar */}
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        {/* Page Title Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Page tittle
          </h2>
          <div className="w-[50%] px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            {pageData.pageTitle}
          </div>
        </div>

        {/* Intro Title Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Intro tittle
          </h2>
          <textarea
            value={pageData.introText}
            onChange={(e) =>
              setPageData({ ...pageData, introText: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter intro text"
          />
          <div className="mt-4">
            <button
              onClick={handleSaveIntro}
              className="px-4 py-2 bg-[#4E6347] text-white rounded-lg hover:bg-[#5a7353] transition-colors font-semibold cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Content Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageData.contentBlocks.map((block) => (
            <div
              key={block.id}
              className="bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {block.title}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(block.id)}
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

export default About;
