// components/Sidebar.tsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaFeatherAlt,
  FaFolderOpen,
  FaCogs,
  FaUser,
  FaPowerOff,
  FaSun,
  FaMoon,
  FaListUl
} from "react-icons/fa";
import logo from "../assets/logo1.png";

const navLinks = [
  { icon: <FaChartLine />, label: "Dashboard", path: "/" },
  { icon: <FaFeatherAlt />, label: "Editor", path: "/editor" },
  { icon: <FaListUl />, label: "Analytics", path: "/analytics" },
  { icon: <FaFolderOpen />, label: "History", path: "/history" },
  { icon: <FaListUl />, label: "Templates", path: "/templates" },
  { icon: <FaCogs />, label: "Settings", path: "/settings" },
  { icon: <FaUser />, label: "Account", path: "/account" }
];

export default function Sidebar() {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState("dark");
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 150);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <motion.aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ width: isHovered ? 200 : 64 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-screen bg-slate-900 border-r border-slate-800 backdrop-blur-md shadow-lg flex flex-col shrink-0"
    >
      <div className="p-3 flex justify-center items-center">
        <img src={logo} alt="GenAirate logo" className="h-12 w-auto object-contain" />
      </div>

      <nav className="flex-1 px-2 space-y-5 mt-2">
        {navLinks.map(({ icon, label, path }, index) => (
          <NavLink key={index} to={path}>
            {({ isActive }) => (
              <motion.div
                className={`flex items-center gap-3 py-2.5 px-2 rounded-md text-sm transition-all duration-200 cursor-pointer
                  ${isHovered ? "justify-start" : "justify-center"}
                  ${isActive ? "bg-emerald-500/10 text-emerald-300" : "text-slate-400 hover:bg-slate-800"}`}
                whileHover={{ scale: 1.01 }}
              >
                <span className="text-lg">{icon}</span>
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 py-4 space-y-3">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 w-full py-2 px-2 rounded-md text-sm transition
            ${isHovered ? "justify-start" : "justify-center"}
            ${theme === "dark" ? "text-yellow-300" : "text-slate-400"} hover:bg-slate-800`}
        >
          <span>{theme === "dark" ? <FaSun /> : <FaMoon />}</span>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          className={`flex items-center gap-3 w-full py-2 px-2 text-rose-300 rounded-md text-sm transition
            ${isHovered ? "justify-start" : "justify-center"} hover:bg-rose-400/10`}
        >
          <FaPowerOff />
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
