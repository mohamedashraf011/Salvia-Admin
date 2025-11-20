import { useState } from "react";
import { FaBars } from "react-icons/fa";
import FixedSidebar from "../../Components/FixedSidebar";
import skyVideo from "../../assets/videos/sky.mp4";
import soilImage from "../../assets/Images/Soil.png";
import seedsImage from "../../assets/Images/seeds.png";
import leavesImage from "../../assets/Images/dried-leaves.png";
import flowersImage from "../../assets/Images/dried-flowers.png";
import logoImage from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";

function Home() {
  const [isFixedSidebarOpen, setIsFixedSidebarOpen] = useState(false);
  const toggleFixedSidebar = () => setIsFixedSidebarOpen(!isFixedSidebarOpen);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src={skyVideo} type="video/mp4" />
      </video>

      {/* Products Container */}
      <div className="absolute bottom-[24%] sm:bottom-[26%] md:bottom-[28%] lg:bottom-[29%] left-1/2 transform -translate-x-1/2 flex justify-center items-end w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] z-10 gap-x-4 sm:gap-x-8 md:gap-x-16 lg:gap-x-32 xl:gap-x-52 px-2 sm:px-4">
        {/* SEEDS */}
        <div className="relative flex flex-col items-center group w-1/3 max-w-[200px]">
          <img
            src={seedsImage}
            alt="Product of Seeds"
            className="w-full h-auto object-contain transition duration-300 group-hover:brightness-75"
          />
          <p className="absolute top-[55%] sm:top-[60%] left-[10%] sm:left-[15%] md:left-[20%] flex flex-col justify-center items-center text-white font-handwriting text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight select-none">
            Product of <br />
            SEEDS
          </p>
        </div>

        {/* DRIED LEAVES */}
        <div className="relative flex flex-col items-center group w-1/3 max-w-[200px] translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-10">
          <img
            src={leavesImage}
            alt="Product of Dried Leaves"
            className="w-full h-auto object-contain transition duration-300 group-hover:brightness-75"
          />
          <p className="absolute top-[45%] sm:top-[50%] left-[-15%] sm:left-[-10%] md:left-[-8%] flex flex-col justify-center items-center text-white font-handwriting text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight select-none">
            Product of <br />
            DRIED LEAVES
          </p>
        </div>

        {/* DRIED FLOWERS */}
        <div className="relative flex flex-col items-center group w-1/3 max-w-[200px]">
          <img
            src={flowersImage}
            alt="Product of Dried Flowers"
            className="w-full h-auto object-contain transition duration-300 group-hover:brightness-75"
          />
          <p className="absolute top-[60%] sm:top-[65%] left-[-5%] sm:left-[-2%] md:left-[-1%] flex flex-col justify-center items-center text-white font-handwriting text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight select-none">
            Product of <br />
            DRIED FLOWERS
          </p>
        </div>
      </div>

      {/* Soil Image */}
      <div className="absolute bottom-0 left-0 w-full h-[35%] sm:h-[40%] md:h-[45%] lg:h-[48%] z-20 pointer-events-none">
        <img
          src={soilImage}
          alt="Soil"
          className="absolute bottom-0 w-full h-full object-cover"
        />
      </div>

      {/* Logo and Menu Button */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-3 sm:left-4 md:left-5 z-30 flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleFixedSidebar}
          className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gray-300/75 hover:bg-gray-300/90 transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
        >
          <FaBars className="text-gray-600 text-xl sm:text-xl md:text-2xl" />
        </button>

        <Link to="/" className="flex items-center">
          <img
            src={logoImage}
            alt="Salvia Naturals Logo"
            className="w-auto h-8 sm:h-10 md:h-12 lg:h-14 select-none"
          />
        </Link>
      </div>

      <FixedSidebar
        isOpen={isFixedSidebarOpen}
        onClose={() => setIsFixedSidebarOpen(false)}
      />
    </div>
  );
}

export default Home;
