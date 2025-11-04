import { Link, useLocation } from "react-router-dom";
import { PiPlantLight, PiCertificate } from "react-icons/pi";
import { TbMessage, TbPhotoCog } from "react-icons/tb";
import { LuNewspaper } from "react-icons/lu";
import { ImLab } from "react-icons/im";
import { BsBoxSeam } from "react-icons/bs";
import logoImage from "../assets/Images/logo.png";
import accountImage from "../assets/Images/account.png";

function FixedSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const sidebarOpen = typeof isOpen === "undefined" ? true : isOpen;

  const links = [
    { to: "/about", label: "About Us", icon: <PiPlantLight /> },
    { to: "/product", label: "Our Products", icon: <BsBoxSeam /> },
    { to: "/our-quality", label: "Our Quality Co.", icon: <PiPlantLight /> },
    { to: "/r-and-d", label: "R&D", icon: <ImLab /> },
    { to: "/gallary", label: "Gallery", icon: <TbPhotoCog /> },
    { to: "/events", label: "Events", icon: <LuNewspaper /> },
    { to: "/contact", label: "Contact Us", icon: <TbMessage /> },
    { to: "/certificates", label: "Certificates", icon: <PiCertificate /> },
    { to: "/page9", label: "Page 9", icon: <PiPlantLight /> },
    { to: "/page10", label: "Page 10", icon: <PiPlantLight /> },
  ];

  return (
    <>
      {typeof isOpen !== "undefined" && (
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 transition-opacity duration-500 ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed left-0 top-0 h-full w-[260px] bg-[#293A23] text-white shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-6 py-6 text-left">
          <div className="mt-4">
            <img
              src={logoImage}
              alt="Salvia Naturals Logo"
              className="w-32 h-auto object-contain"
            />
          </div>

          <ul className="flex flex-col gap-5 text-lg font-light ml-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-3 font-bold transition-colors ${
                    location.pathname === link.to
                      ? "bg-[#3a5230] px-2 py-2 rounded-xl"
                      : "hover:text-gray-300"
                  }`}
                  onClick={onClose}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 mt-4">
            <img
              src={accountImage}
              alt="Profile Picture"
              className="rounded-full object-cover w-10 h-10"
            />
            <div>
              <p className="text-sm font-semibold">Mohamed Mohamady</p>
              <p className="text-xs text-gray-300">mohamed@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FixedSidebar;
