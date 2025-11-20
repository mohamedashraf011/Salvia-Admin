import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { base_url } from "../../utils/Domain";

function Certificate() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCertificate) return;
    try {
      await axios.delete(
        `${base_url}/api/certificates/${selectedCertificate._id || selectedCertificate.id
        }`, {headers: { Authorization: `${localStorage.getItem("token")} ` }}
      );
      setCertificates((prev) =>
        prev.filter(
          (cert) =>
            (cert._id || cert.id) !==
            (selectedCertificate._id || selectedCertificate.id)
        )
      );
    } catch (err) {
      alert("Failed to delete certificate. Please try again.");
    }
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${base_url}/api/certificates`, {headers: { Authorization: `${localStorage.getItem("token")} ` }});
        setCertificates(res.data.certificates || []);
      } catch (err) {
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8 flex-col md:flex-row md:gap-0 gap-5">
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

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-2xl">Loading certificates...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.length === 0 ? (
              <div className="text-center py-12 col-span-3">
                <p className="text-gray-400">No certificates found.</p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert._id || cert.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <img
                    src={cert?.image}
                    alt={cert.name || cert.title || "Certificate"}
                    className="w-full h-auto object-contain mb-4"
                  />
                  <p>
                    {cert.certificateBody || cert.body || "Certification body"}
                  </p>
                  <p>
                    {cert.certificateNumber || cert.number || "Certificate no"}
                  </p>
                  <p>
                    {cert.expiryDate
                      ? new Date(cert.expiryDate).toLocaleDateString("en-CA")
                      : cert.expiry
                      ? new Date(cert.expiry).toLocaleDateString("en-CA")
                      : "Expiry date"}
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <Link
                      to={`/edit-certificate/${cert._id || cert.id}`}
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
              ))
            )}
          </div>
        )}
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
