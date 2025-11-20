import { useState, useEffect, useRef } from "react";
import FixedSidebar from "../../Components/FixedSidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../utils/Domain";

function Preview() {
  const navigate = useNavigate();
  const { sectionName, sectionDetails, sectionId } = useParams();
  const decSectionName = decodeURIComponent(sectionName);
  const decSectionDetails = decodeURIComponent(sectionDetails);
  const [sectionData, setSectionData] = useState({
    _id: sectionId,
    name: decSectionName,
    details: decSectionDetails,
  });
  // console.log(sectionData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [serverError, setServerError] = useState(null);
  const originalRef = useRef(sectionData); // store original data to detect changes
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  // fetch function extracted so we can retry on error
  const fetchSectionData = async () => {
    try {
      setLoading(true);

      // Get authentication token
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            Authorization: `${token}`,
          }
        : {};

      // Fetch all sections to find the current one
      const response = await axios.get(
        `${base_url}/api/our-quality-commitment/sections`,
        { headers }
      );
      const sections = response.data.sections || response.data;
      const currentSection = sections.find(
        (section) => section.name === decSectionName
      );
      if (currentSection) {
        const fetched = {
          _id: currentSection._id,
          name: currentSection.name,
          details: currentSection.details,
        };
        setSectionData(fetched);
        originalRef.current = fetched;
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching section data:", err);
      setError("Failed to load section data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decSectionName]);

  const handleSave = async () => {
    // client-side validation
    setServerError(null);
    const name = (sectionData.name || "").trim();
    const details = (sectionData.details || "").trim();
    if (!name || !details) {
      setServerError("Title and description are required.");
      return;
    }

    // nothing to save
    const isDirty =
      String(originalRef.current._id) !== String(sectionData._id) ||
      originalRef.current.name !== sectionData.name ||
      originalRef.current.details !== sectionData.details;
    if (!isDirty) {
      setServerError("No changes to save.");
      return;
    }

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            Authorization: `${token}`,
          }
        : {};
      const res = await axios.put(
        `${base_url}/api/our-quality-commitment/section`,
        {
          sectionId: sectionData._id,
          name: sectionData.name,
          details: sectionData.details,
        },
        { headers }
      );
      setSuccessMsg(res?.data?.message || "Section saved successfully!");
      // update original snapshot
      originalRef.current = { ...sectionData };
      // short delay so user sees the success message
      setTimeout(() => navigate("/our-quality"), 800);
    } catch (err) {
      console.error("Error saving section:", err);
      setServerError(
        err?.response?.data?.message ||
          "Failed to save section. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // if there are unsaved changes, confirm with the user
    const isDirty =
      String(originalRef.current._id) !== String(sectionData._id) ||
      originalRef.current.name !== sectionData.name ||
      originalRef.current.details !== sectionData.details;
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Discard and leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/our-quality");
  };

  // prevent accidental unload when unsaved
  useEffect(() => {
    const onBeforeUnload = (e) => {
      const isDirty =
        String(originalRef.current._id) !== String(sectionData._id) ||
        originalRef.current.name !== sectionData.name ||
        originalRef.current.details !== sectionData.details;
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [sectionData]);

  // keyboard shortcut: Ctrl/Cmd+S to save
  useEffect(() => {
    const onKeyDown = (e) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionData]);

  const nameTrimmed = (sectionData.name || "").trim();
  const detailsTrimmed = (sectionData.details || "").trim();
  const isValid = nameTrimmed.length > 0 && detailsTrimmed.length > 0;
  const isDirty =
    String(originalRef.current._id) !== String(sectionData._id) ||
    originalRef.current.name !== sectionData.name ||
    originalRef.current.details !== sectionData.details;

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

  if (error) {
    return (
      <div className="flex">
        <FixedSidebar />
        <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
              <div className="mt-3">
                <button
                  onClick={() => fetchSectionData()}
                  className="px-4 py-2 bg-[#4E6347] text-white rounded"
                >
                  Retry
                </button>
              </div>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Edit Section: {sectionData.name}
        </h1>

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
            Section Title
          </h2>
          <input
            ref={titleRef}
            type="text"
            value={sectionData.name}
            onChange={(e) =>
              setSectionData({ ...sectionData, name: e.target.value })
            }
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent"
            placeholder="Enter section title"
            aria-invalid={!nameTrimmed}
            aria-describedby="title-help"
          />
          <p id="title-help" className="text-sm text-gray-500 mt-1">
            {nameTrimmed.length === 0
              ? "Title is required."
              : `${nameTrimmed.length} characters`}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Description
          </h2>
          <textarea
            ref={detailsRef}
            value={sectionData.details}
            onChange={(e) =>
              setSectionData({ ...sectionData, details: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#293A23] focus:border-transparent resize-vertical"
            placeholder="Enter description"
            aria-invalid={!detailsTrimmed}
            aria-describedby="details-help"
          />
          <p id="details-help" className="text-sm text-gray-500 mt-1">
            {detailsTrimmed.length === 0
              ? "Description is required."
              : `${detailsTrimmed.length} characters`}
          </p>
        </div>

        <div className="flex gap-4 mt-12 justify-center">
          <button
            onClick={async () => {
              // focus first invalid field if invalid
              if (!isValid) {
                if (!nameTrimmed && titleRef.current) titleRef.current.focus();
                else if (!detailsTrimmed && detailsRef.current)
                  detailsRef.current.focus();
                setServerError("Please fix validation errors before saving.");
                return;
              }
              await handleSave();
            }}
            disabled={isSaving || !isDirty || !isValid}
            aria-disabled={isSaving || !isDirty || !isValid}
            className={`px-4 py-3 rounded-lg transition-colors font-semibold cursor-pointer ${
              isSaving || !isDirty || !isValid
                ? "bg-gray-400 text-gray-800"
                : "bg-[#4E6347] text-white hover:bg-[#5a7353]"
            }`}
          >
            {isSaving ? "Saving..." : !isDirty ? "No changes" : "Save Changes"}
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
