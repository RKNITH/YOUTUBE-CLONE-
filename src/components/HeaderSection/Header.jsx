import React, { useState } from "react";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import SpinnerLoader from "../../utils/SpinnerLoader";
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Desktop_logo from "../../images/yt_dekstop.png";
import mobile_logo from "../../images/youtube_mobile.png";
import { IoIosSearch, IoMdMic, IoMdMicOff } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiMoon, FiSun } from "react-icons/fi";
import useSpeechRecognitions from "../../useContextHook/useSpeechRecognition";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const {listening,stopListening,startListening,browserSupportsSpeechRecognition}= useSpeechRecognitions(setSearchQuery);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSearchQuery = () => {
    if (searchQuery?.length > 0) {
      navigate(`search/${searchQuery}`);
    }
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  const mobileToggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div
      className={`sticky top-0 z-10 flex flex-row items-center justify-between h-20 shadow-lg px-4 md:px-5 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } text-${isDarkMode ? "white" : "bg-gray-700"}`}
    >
      {loading && <SpinnerLoader />}
      <div className="flex h-5 items-center">
        <div
          className={`flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-9 w-9 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
          onClick={mobileToggleMenu}
        >
          {mobileMenu ? (
            <CgClose className="text-lg" />
          ) : (
            <SlMenu className="text-lg" />
          )}
        </div>

        <Link to="/" className="flex items-center h-20">
          <img
            src={Desktop_logo}
            alt="youtube_desktop_logo"
            className={`hidden md:block h-full object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
          <img
            src={mobile_logo}
            alt="youtube_mobile_logo"
            className={`md:hidden h-14  object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </Link>
      </div>
      <div className="flex items-center group relative">
        <div
          className={`flex h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="search anything..."
            className={`pl-5 pr-5 text-sm bg-transparent outline-none md:pl-0 w-32 sm:w-44 md:w-64 lg:w-[500px] ${
              isDarkMode ? " text-white" : "text-black"
            }`}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearchQuery();
            }}
            value={searchQuery}
          />
          {searchQuery && (
            <button
              className="absolute right-24 md:right-32 top-1/2 transform -translate-y-1/2"
              onClick={handleClearSearchQuery}
            >
              <CgClose className="text-xl" />
            </button>
          )}
        </div>

        <button
          className={`flex items-center justify-center w-[40px] md:w-[60px] h-10 rounded-r-3xl  border border-l-0 ${
            isDarkMode ? "border-gray-700 " : "border-gray-300"
          } bg-${isDarkMode ? "gray-700" : "gray-100"}`}
          onClick={handleSearchQuery}
        >
          <IoIosSearch className="text-xl" />
        </button>
        <button
          className={`flex items-center justify-center w-[40px] md:w-[60px] h-8 md:h-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          } ml-2`}
           onClick={() =>{
             if(listening){
              stopListening()
             }
             else{
              startListening()
             }
           }}
        >
          {listening ? <IoMdMicOff className='text-xl' /> : <IoMdMic className="text-xl" /> }
        </button>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4 ">
        <button
          className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
        >
          <MdVideoCall className="text-xl" />
        </button>

        <button
          className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
        >
          <FaBell className="text-xl" />
        </button>

        <div className="flex space-x-0 md:space-x-2">
          <button
            className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
              isDarkMode ? "gray-700" : "gray-300"
            }`}
          >
            <RiAccountCircleLine className="text-xl" />
          </button>
          <button className={`flex items-center justify-center h-10 w-10 rounded-full hover:bg-${isDarkMode ? "gray-700" : "gray-300"}`}
           onClick={toggleTheme}
          >
                 {isDarkMode ? (
                <FiSun className="text-xl text-yellow-300"/> 
                 ) : (
                   <FiMoon className="text-xl text-gray-800"/>
                 )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
