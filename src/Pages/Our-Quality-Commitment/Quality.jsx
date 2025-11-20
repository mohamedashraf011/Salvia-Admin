import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/Domain";

function Quality() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    pageTitle: "Our Quality Commitment",
    introText: "",
    finalTitle: "",
    finalText: "",
  });
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [serverError, setServerError] = useState(null);

  // Fetch page data and sections from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get authentication token
        const token = localStorage.getItem("token");
        const headers = token
          ? {
              Authorization: `${token}`,
            }
          : {};

        // Fetch page content
        const pageResponse = await axios.get(
          `${base_url}/api/our-quality-commitment/page`,
          { headers }
        );
        const pageContent = pageResponse.data;

        // Fetch sections
        const sectionsResponse = await axios.get(
          `${base_url}/api/our-quality-commitment/sections`,
          { headers }
        );
        const sectionsData =
          sectionsResponse.data.sections || sectionsResponse.data;

        // Set page data with fallback defaults
        setPageData({
          pageTitle: pageContent.pageTitle || "Our Quality Commitment",
          introText:
            pageContent.intro ||
            "At Salvia Naturals, quality is not just a standard - it is the foundation of everything we do. From sourcing our herbs across Egypt and Sudan to delivering them worldwide, we are committed to ensuring that every product meets the highest levels of safety, purity, and reliability.",
          finalTitle: pageContent.finalTitle || "",
          finalText:
            pageContent.finalText ||
            "At Salvia Naturals, we are not only delivering herbs - we are delivering trust, safety, and excellence with every shipment.",
        });

        // Set sections with fallback defaults
        if (sectionsData.length > 0) {
          setSections(sectionsData);
        } else {
          // Default sections if none exist
          setSections([
            {
              name: "Food Safety & Compliancexxxxxxxx",
              details:
                "We adhere to stringent international food safety standards and regulations. Our products are tested and certified to ensure compliance with FDA, EU, and other global food safety requirements.",
            },
            {
              name: "Pesticides & Heavy Metals",
              details:
                "Every batch undergoes rigorous testing for pesticide residues and heavy metal contamination to ensure products are safe for consumption.",
            },
            {
              name: "Microbiology, Yeasts & Moulds",
              details:
                "Comprehensive microbiological testing ensures our herbs are free from harmful bacteria, yeasts, and moulds that could compromise quality and safety.",
            },
            {
              name: "Moisture Content",
              details:
                "Optimal moisture levels are maintained through careful drying and storage processes to preserve quality and extend shelf life.",
            },
            {
              name: "Pyrrolizidine Alkaloids (PAs) & PAHs",
              details:
                "Advanced testing protocols detect and eliminate potentially harmful alkaloids and polycyclic aromatic hydrocarbons.",
            },
            {
              name: "Packaging & Integrity",
              details:
                "Protective, food-grade packaging preserves freshness and ensures products reach customers in optimal condition.",
            },
            {
              name: "Continuous Improvement",
              details:
                "We continually refine our processes and adopt the latest quality assurance technologies to exceed industry standards.",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");

        // Set fallback data on error
        setPageData({
          pageTitle: "Our Quality Commitment",
          introText:
            "At Salvia Naturals, quality is not just a standard - it is the foundation of everything we do. From sourcing our herbs across Egypt and Sudan to delivering them worldwide, we are committed to ensuring that every product meets the highest levels of safety, purity, and reliability.",
          finalTitle: "",
          finalText:
            "At Salvia Naturals, we are not only delivering herbs - we are delivering trust, safety, and excellence with every shipment.",
        });

        setSections([
          {
            name: "Food Safety & Compliance",
            details:
              "We adhere to stringent international food safety standards and regulations. Our products are tested and certified to ensure compliance with FDA, EU, and other global food safety requirements.",
          },
          {
            name: "Pesticides & Heavy Metals",
            details:
              "Every batch undergoes rigorous testing for pesticide residues and heavy metal contamination to ensure products are safe for consumption.",
          },
          {
            name: "Microbiology, Yeasts & Moulds",
            details:
              "Comprehensive microbiological testing ensures our herbs are free from harmful bacteria, yeasts, and moulds that could compromise quality and safety.",
          },
          {
            name: "Moisture Content",
            details:
              "Optimal moisture levels are maintained through careful drying and storage processes to preserve quality and extend shelf life.",
          },
          {
            name: "Pyrrolizidine Alkaloids (PAs) & PAHs",
            details:
              "Advanced testing protocols detect and eliminate potentially harmful alkaloids and polycyclic aromatic hydrocarbons.",
          },
          {
            name: "Packaging & Integrity",
            details:
              "Protective, food-grade packaging preserves freshness and ensures products reach customers in optimal condition.",
          },
          {
            name: "Continuous Improvement",
            details:
              "We continually refine our processes and adopt the latest quality assurance technologies to exceed industry standards.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (sectionName, sectionDetails, sectionId) => {
    navigate(
      `/quality-preview/${sectionId}/${encodeURIComponent(sectionName)}`
    );
  };

  const handleSavePage = async () => {
    try {
      setServerError(null);
      setSuccessMsg(null);
      setIsSaving(true);

      const token = localStorage.getItem("token");
      const headers = token
        ? {
            Authorization: `${token}`,
          }
        : {};

      const res = await axios.put(
        `${base_url}/api/our-quality-commitment/page`,
        {
          pageTitle: pageData.pageTitle,
          intro: pageData.introText,
          finalTitle: pageData.finalTitle,
          finalText: pageData.finalText,
        },
        { headers }
      );

      setSuccessMsg(res?.data?.message || "Page saved successfully!");
      // auto-hide success after 2s
      setTimeout(() => setSuccessMsg(null), 2000);
    } catch (err) {
      console.error("Error saving page:", err);
      setServerError(
        err?.response?.data?.message || "Failed to save page. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4E6347] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading quality commitment data...</p>
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
      {/* {console.log(sections)} */}
      <FixedSidebar />

      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14] bg-gray-100 min-h-screen">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Page Title
          </h2>
          <div className="w-[80%] md:w-[50%] px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed">
            {pageData.pageTitle}
          </div>
        </div>

        {successMsg && (
          <div
            className="mb-6 text-green-700 bg-green-100 px-4 py-3 rounded"
            role="status"
            aria-live="polite"
          >
            {successMsg}
          </div>
        )}
        {serverError && (
          <div
            className="mb-6 text-red-700 bg-red-100 px-4 py-3 rounded"
            role="alert"
            aria-live="assertive"
          >
            {serverError}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Intro Text
          </h2>
          <textarea
            value={pageData.introText}
            onChange={(e) =>
              setPageData({ ...pageData, introText: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter intro text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow ${
                section.name === "Continuous Improvement" ? "md:col-span-2" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {section.name}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleEdit(section.name, section.details, section._id)
                  }
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <FaEdit className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Final Text
          </h2>
          <textarea
            value={pageData.finalText}
            onChange={(e) =>
              setPageData({ ...pageData, finalText: e.target.value })
            }
            rows={2}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter final text"
          />
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button
            onClick={handleSavePage}
            disabled={isSaving}
            aria-disabled={isSaving}
            className={`px-6 py-3 rounded-lg transition-colors font-semibold cursor-pointer ${
              isSaving
                ? "bg-gray-400 text-gray-800"
                : "bg-[#4E6347] text-white hover:bg-[#5a7353]"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quality;
