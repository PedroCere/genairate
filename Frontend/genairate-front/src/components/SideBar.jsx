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
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 200);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <motion.aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ width: isHovered ? 256 : 64 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="h-screen bg-[#1E293B] border-r border-[#334155] backdrop-blur-lg overflow-hidden shadow-xl flex flex-col shrink-0"
    >
      {/* LOGO */}
      <div className="p-4 flex justify-center items-center">
        <img src={logo} alt="GenAirate logo" className="h-[65px] w-auto object-contain" />
      </div>

      {/* NAVIGATION - Espaciado idéntico a OXI */}
      <nav className="flex flex-col px-2 flex-1 space-y-6">
        <div className="space-y-2">
          {navLinks.map(({ icon, label, path }, i) => (
            <NavLink key={i} to={path}>
              {({ isActive }) => (
                <motion.button
                  className={`w-full flex items-center ${
                    isHovered ? "justify-start px-4" : "justify-center px-2"
                  } gap-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.15)]"
                      : "hover:bg-white/5 text-[#94A3B8]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-lg text-current">{icon}</span>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* BOTTOM SETTINGS - Espaciado idéntico a OXI */}
      <div className="px-2 pb-4 space-y-6">
        <div className="space-y-2">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center ${
              isHovered ? "justify-start px-4" : "justify-center px-2"
            } gap-3 py-2.5 rounded-lg text-sm transition-all ${
              theme === "dark" ? "text-amber-300" : "text-slate-400"
            } hover:bg-white/5`}
          >
            <span className="text-lg">
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className={`w-full flex items-center ${
              isHovered ? "justify-start px-4" : "justify-center px-2"
            } gap-3 py-2.5 rounded-lg text-sm transition-all text-rose-300 hover:bg-rose-500/10`}
          >
            <FaPowerOff className="text-lg" />
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm"
                >
                  Log out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}