import React, { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiSearch
} from "react-icons/fi";
import {
  FaBell,
  FaSun,
  FaMoon,
  FaVolumeUp,
  FaVolumeMute,
  FaPalette
} from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [greeting, setGreeting] = useState("");
  const [notificationCount] = useState(3);
  const [hidden, setHidden] = useState(false);
  const [themeColor, setThemeColor] = useState("emerald");
  const [lastActive, setLastActive] = useState("");
  const [searching, setSearching] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleTheme = () => {
    const next = themeColor === "emerald" ? "purple" : themeColor === "purple" ? "teal" : "emerald";
    setThemeColor(next);
    localStorage.setItem("themeColor", next);
    toast(`Theme set to ${next}`, { type: "info", autoClose: 2000 });
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    toast.info(`Switched to ${newMode ? "Dark" : "Light"} Mode`, { autoClose: 2000 });
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    setHidden(latest > prev);
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const autoDark = !(hour >= 6 && hour < 18);
    setDarkMode(autoDark);
    setSoundVolume(parseFloat(localStorage.getItem("soundVolume") || "0.5"));
    setThemeColor(localStorage.getItem("themeColor") || "emerald");

 
    const last = new Date();
    last.setMinutes(last.getMinutes() - 12);
    setLastActive(last.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  return (
    <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
    transition={{ duration: 0.4 }}
    className="h-16 relative backdrop-blur-md bg-[#1B1B1B]/80 border-b border-[#2F2F2F] shadow-sm sticky top-0 z-40"
  >
    <ToastContainer position="top-right" theme="dark" />
  
   
    <div className="absolute left-0 h-full flex items-center gap-3 pl-4">
      <motion.img src="/oxilogo.png" alt="OXI Logo" className="w-8 h-auto" whileHover={{ rotate: 12 }} />
      <motion.span
        className="text-sm text-emerald-300"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {greeting}, Santino 🌱
      </motion.span>
    </div>
  
      <div className="flex items-center justify-end h-full pr-4 md:pr-6 ml-auto gap-4">       
        <div className="relative">
          <input
            onFocus={() => setSearching(true)}
            onBlur={() => setTimeout(() => setSearching(false), 200)}
            type="text"
            placeholder="Search..."
            className="bg-[#252525] px-10 py-1.5 rounded-md border border-[#2F2F2F] text-sm text-white placeholder-gray-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition w-36 focus:w-64"
          />
          <motion.div
            animate={{ rotate: searching ? 360 : 0 }}
            transition={{ repeat: searching ? Infinity : 0, duration: 1.2, ease: "linear" }}
            className="absolute left-3 top-2.5 text-gray-400"
          >
            <FiSearch />
          </motion.div>
        </div>

        <div className="relative">
          <button className="text-gray-400 hover:text-white transition">
            <FaBell />
          </button>
          <span className="absolute -top-1 -right-1 text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
            {notificationCount}
          </span>
        </div>

      
        <button onClick={toggleDarkMode} className="text-gray-400 hover:text-yellow-400 transition">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="flex items-center gap-1">
          {soundVolume > 0 ? <FaVolumeUp className="text-emerald-400" /> : <FaVolumeMute className="text-gray-400" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={soundVolume}
            onChange={(e) => {
              setSoundVolume(parseFloat(e.target.value));
              localStorage.setItem("soundVolume", e.target.value);
            }}
            className="w-20 accent-emerald-400"
          />
        </div>

        <button onClick={toggleTheme} className="text-gray-400 hover:text-purple-400 transition">
          <FaPalette />
        </button>

        <div className="flex items-center gap-2 relative cursor-pointer group" onClick={toggleMenu}>
          <div className="relative">
            <img
              src="/profile.jpg"
              alt="User"
              className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-emerald-400 transition-all ring-2 ring-green-400 ring-offset-2"
            />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-[#1B1B1B]" />
          </div>
          <span className="text-sm font-medium text-white hidden md:block">Santino Panchino</span>
          <FiChevronDown className={`text-gray-400 transition-transform ${isMenuOpen ? "rotate-180 text-emerald-400" : ""}`} />

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-14 right-0 w-56 bg-[#252525] rounded-lg shadow-xl z-50 border border-[#2F2F2F]"
              >
                <div className="py-2">
                  <p className="px-4 py-2 text-sm text-gray-400 italic">Last seen at {lastActive}</p>
                  <hr className="border-[#2F2F2F]" />
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">Profile Settings</button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">Change Language 🌍</button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-emerald-400/10 transition-all">View Activity Log</button>
                  <div className="border-t border-[#2F2F2F] my-1" />
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-rose-500/10 hover:text-rose-400 transition-all">Logout</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
