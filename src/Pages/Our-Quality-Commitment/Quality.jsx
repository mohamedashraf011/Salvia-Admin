import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { useNavigate } from "react-router-dom";

function Quality() {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const [pageData, setPageData] = useState({
    pageTitle: "Our Quality Commitment",
    introTitle: "Intro tittle",
    introText:
      "At Salvia Naturals, quality is not just a standard - it is the foundation of everything we do. From sourcing our herbs across Egypt and Sudan to delivering them worldwide, we are committed to ensuring that every product meets the highest levels of safety, purity, and reliability.",
    contentBlocks: [
      {
        id: 1,
        title: "Food Safety & Compliance",
        sectionTitle: "Food Safety & Compliance",
        description:
          "We adhere to stringent international food safety standards and regulations. Our products are tested and certified to ensure compliance with FDA, EU, and other global food safety requirements.",
      },
      {
        id: 2,
        title: "Pesticides & Heavy Metals",
        sectionTitle: "Pesticides & Heavy Metals",
        description:
          "Every batch undergoes rigorous testing for pesticide residues and heavy metal contamination to ensure products are safe for consumption.",
      },
      {
        id: 3,
        title: "Microbiology, Yeasts & Moulds",
        sectionTitle: "Microbiology, Yeasts & Moulds",
        description:
          "Comprehensive microbiological testing ensures our herbs are free from harmful bacteria, yeasts, and moulds that could compromise quality and safety.",
      },
      {
        id: 4,
        title: "Moisture Content",
        sectionTitle: "Moisture Content",
        description:
          "Optimal moisture levels are maintained through careful drying and storage processes to preserve quality and extend shelf life.",
      },
      {
        id: 5,
        title: "Pyrrolizidine Alkaloids (PAs) & PAHs",
        sectionTitle: "Pyrrolizidine Alkaloids (PAs) & PAHs",
        description:
          "Advanced testing protocols detect and eliminate potentially harmful alkaloids and polycyclic aromatic hydrocarbons.",
      },
      {
        id: 6,
        title: "Packaging & Integrity",
        sectionTitle: "Packaging & Integrity",
        description:
          "Protective, food-grade packaging preserves freshness and ensures products reach customers in optimal condition.",
      },
      {
        id: 7,
        title: "Continuous Improvement",
        sectionTitle: "Continuous Improvement",
        description:
          "We continually refine our processes and adopt the latest quality assurance technologies to exceed industry standards.",
      },
    ],
    finalTitle: "Final tittle",
    finalText:
      "At Salvia Naturals, we are not only delivering herbs - we are delivering trust, safety, and excellence with every shipment.",
  });

  const handleEdit = (blockId) => {
    navigate(`/quality-preview/${blockId}`);
  };

  const handleDeleteClick = (block) => {
    setSelectedBlock(block);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBlock) {
      // TODO: Delete from API
      // const deleteBlock = async () => {
      //   try {
      //     await axios.delete(`YOUR_API_ENDPOINT_HERE/${selectedBlock.id}`);
      //     setPageData({
      //       ...pageData,
      //       contentBlocks: pageData.contentBlocks.filter(
      //         (block) => block.id !== selectedBlock.id
      //       ),
      //     });
      //     setDeleteModalOpen(false);
      //   } catch (error) {
      //     console.error('Error deleting block:', error);
      //   }
      // };
      // deleteBlock();

      // Remove from local state
      setPageData({
        ...pageData,
        contentBlocks: pageData.contentBlocks.filter(
          (block) => block.id !== selectedBlock.id
        ),
      });
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSelectedBlock(null);
  };

  // TODO: Fetch data from API - uncomment when API is ready
  // import axios from 'axios';
  // import { useEffect } from 'react';
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('YOUR_API_ENDPOINT_HERE');
  //       setPageData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter intro text"
          />
        </div>

        {/* Content Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageData.contentBlocks.map((block) => (
            <div
              key={block.id}
              className={`bg-white border border-gray-300 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow ${
                block.title === "Continuous Improvement" ? "md:col-span-2" : ""
              }`}
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
                <button
                  onClick={() => handleDeleteClick(block)}
                  className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Final Title Section */}
        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Final tittle
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
      </div>

      {/* Delete Modal */}
      <Delete
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default Quality;
