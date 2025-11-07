import { useState } from "react";
import { Link } from "react-router-dom";
import FixedSidebar from "../../Components/FixedSidebar";
import Delete from "../../Components/Delete";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineArrowOutward } from "react-icons/md";
import eventImage1 from "../../assets/Images/Event1.png";
import eventImage2 from "../../assets/Images/Event2.png";
import eventImage3 from "../../assets/Images/Event3.png";

function Event() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting event:", selectedEvent);
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  const handleCardClick = (id) => {
    console.log("Clicked event id:", id);
  };

  const events = [
    {
      id: 1,
      title: "Plants in the world Lorem Lorem Lorem ",
      date: "2024-03-15",
      location: "Cairo International Convention Center",
      description:
        "Join us for our annual conference featuring industry leaders and networking opportunities.",
      image: eventImage1,
    },
    {
      id: 2,
      title: "Plants in the world Lorem Lorem Lorem ",
      date: "2024-04-20",
      location: "Grand Nile Tower Hotel",
      description:
        "Be the first to see our latest innovations and upcoming product releases.",
      image: eventImage2,
    },
    {
      id: 3,
      title: "Plants in the world Lorem Lorem Lorem ",
      date: "2024-05-10",
      location: "Smart Village",
      description:
        "Hands-on workshop covering digital transformation strategies and implementation.",
      image: eventImage3,
    },
    {
      id: 4,
      title: "Plants in the world Lorem Lorem Lorem ",
      date: "2024-06-05",
      location: "Company Headquarters",
      description:
        "A special day to celebrate and thank our valued customers and partners.",
      image: eventImage1,
    },
  ];

  return (
    <div className="flex">
      <FixedSidebar />
      <div className="flex-1 ml-[260px] bg-gray-100 min-h-screen p-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Events</h1>
            <Link
              to="/add-event"
              className="bg-[#4E6347] hover:bg-[#3a5230] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add New Event
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#F4FFF0] rounded-md shadow-md flex flex-col overflow-hidden hover:shadow-lg hover:bg-[#ECFFE5] transition-shadow duration-300"
                onClick={() => handleCardClick(event.id)}
              >
                <div className="p-6 flex flex-col">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                    <span>{event.title}</span>
                    <MdOutlineArrowOutward className="text-2xl text-green-600 shrink-0 ml-3" />
                  </h3>

                  <div className="flex justify-end gap-3 pt-6 ">
                    <Link
                      to={`/edit-event/${event.id}`}
                      className="bg-[#4E6347] hover:bg-[#3a5230] text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                      title="Edit Event"
                    >
                      <FaRegEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(event)}
                      className="bg-[#4E6347] hover:bg-[#3a5230] text-white p-2 rounded-full transition-colors duration-200 cursor-pointer"
                      title="Delete Event"
                    >
                      <RiDeleteBin6Line className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
