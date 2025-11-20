import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineArrowOutward } from "react-icons/md";
import axios from "axios";
import { base_url } from "../../utils/Domain";

function Event() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${base_url}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${base_url}/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== selectedEvent._id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
      console.error("Error deleting event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  const handleCardClick = (id) => {
    console.log("Clicked event id:", id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[180px] md:ml-[260px] p-5 md:p-14 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center flex-col gap-3 md:flex-row md:gap-0 mb-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Page title
            </h2>
            <input
              type="text"
              value="Events"
              readOnly
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </div>
          <Link
            to="/add-event"
            className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Add New Event
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && events.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">Loading events...</div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">
              No events yet. Add your first event!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-[#F4FFF0] rounded-md shadow-md flex flex-col overflow-hidden hover:shadow-lg hover:bg-[#ECFFE5] transition-shadow duration-300"
                onClick={() => handleCardClick(event._id)}
              >
                <div className="p-6 flex flex-col">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-between">
                    <span className="line-clamp-2">{event.title}</span>
                    <MdOutlineArrowOutward className="text-2xl text-green-600 shrink-0 ml-3" />
                  </h3>

                  <div className="text-sm text-gray-600 mb-2">
                    <p className="font-medium">{formatDate(event.date)}</p>
                    {event.location && (
                      <p className="text-gray-500">{event.location}</p>
                    )}
                  </div>

                  {event.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="flex justify-end gap-3 pt-4 mt-auto">
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="bg-[#4E6347] hover:bg-[#3a5230] text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                      title="Edit Event"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaRegEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(event);
                      }}
                      disabled={loading}
                      className="bg-[#4E6347] hover:bg-[#3a5230] text-white p-2 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50"
                      title="Delete Event"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Delete
        isOpen={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default Event;
