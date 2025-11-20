import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/Domain";
import axios from 'axios';

function About() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [pageData, setPageData] = useState({
    pageTitle: "",
    introText: "",
    contentBlocks: [],
  });

  const handleEdit = (blockId) => {
    navigate(`/preview/${blockId}`);
  };

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const [pageRes, sectionsRes] = await Promise.all([
          axios.get(`${base_url}/api/about-us/page`),
          axios.get(`${base_url}/api/about-us/sections`)
        ]);

        const page = pageRes.data || {};
        const sections = (sectionsRes.data && sectionsRes.data.sections) || [];

        setPageData({
          pageTitle: page.pageTitle || "",
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
        setMessage({ type: 'error', text: 'Failed to load data. Please try again.' });
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const handleSaveIntro = async () => {
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      const token = localStorage.getItem('token');
      await axios.put(
        `${base_url}/api/about-us/page`,
        { pageTitle: pageData.pageTitle, intro: pageData.introText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: 'success', text: 'Page updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving About Us page:', error);
      setMessage({ type: 'error', text: 'Failed to save. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[200px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#4E6347] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us</h1>
          <p className="text-gray-600">Manage your About Us page content</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Page Title Section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Page Title
          </h2>
          <div className="w-full max-w-md px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
            {pageData.pageTitle || "No title set"}
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Introduction Text
          </h2>
          <textarea
            value={pageData.introText}
            onChange={(e) =>
              setPageData({ ...pageData, introText: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical transition-all"
            placeholder="Enter introduction text for the About Us page..."
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleSaveIntro}
              disabled={saving}
              className="px-6 py-2.5 bg-[#4E6347] text-white rounded-lg hover:bg-[#5a7353] transition-colors font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>

        {/* Content Blocks Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Content Sections
          </h2>
          {pageData.contentBlocks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No sections available</p>
              <p className="text-sm mt-2">Sections will appear here once created</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pageData.contentBlocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex justify-between items-start hover:shadow-md hover:border-[#4E6347] transition-all group"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#4E6347] transition-colors">
                      {block.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {block.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(block.id)}
                    className="text-gray-400 hover:text-[#4E6347] transition-colors cursor-pointer p-2 hover:bg-[#4E6347]/10 rounded-lg"
                    title="Edit section"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
