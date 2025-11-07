import { useState } from "react";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import certificateImage from "../../assets/Images/Certificates.png";

function Certificate() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleDeleteClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting certificate:", selectedCertificate);
    setIsDeleteOpen(false);
  };

  const certificates = [
    {
      id: 1,
      name: "ISO 9001:2015",
      body: "Certification body",
      number: "Certificate no",
      expiry: "Expiry date",
      image: certificateImage,
    },
    {
      id: 2,
      name: "ISO 9001:2015",
      body: "Certification body",
      number: "Certificate no",
      expiry: "Expiry date",
      image: certificateImage,
    },
    {
      id: 3,
      name: "ISO 9001:2015",
      body: "Certification body",
      number: "Certificate no",
      expiry: "Expiry date",
      image: certificateImage,
    },
    {
      id: 4,
      name: "ISO 9001:2015",
      body: "Certification body",
      number: "Certificate no",
      expiry: "Expiry date",
      image: certificateImage,
    },
  ];

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        <div className="flex justify-between items-center mb-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Page title
            </h2>
            <input
              type="text"
              value="Certificates"
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <Link
            to="/add-certificate"
            className="bg-[#4E6347] text-white px-4 py-2 rounded-md"
          >
            Add New Certificates
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-auto object-contain mb-4"
              />
              <p>{cert.body}</p>
              <p>{cert.number}</p>
              <p>{cert.expiry}</p>
              <div className="flex justify-end gap-4 mt-4">
                <Link
                  to={`/edit-certificate/${cert.id}`}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-3 transition-colors"
                >
                  <FaRegEdit className="text-xl text-white cursor-pointer" />
                </Link>
                <button
                  onClick={() => handleDeleteClick(cert)}
                  className="bg-[#4E6347] hover:bg-[#3a5230] rounded-full p-3 transition-colors"
                >
                  <RiDeleteBin6Line className="text-xl text-white cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Delete
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default Certificate;
