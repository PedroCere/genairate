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
  FaListUl,
  FaChevronRight,
  FaChevronLeft,
  FaBars
} from "react-icons/fa";

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
  const [isStatic, setIsStatic] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (!isStatic) {
      clearTimeout(hoverTimeout.current);
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isStatic) {
      hoverTimeout.current = setTimeout(() => setIsHovered(false), 300);
    }
  };

  const toggleStatic = () => {
    setIsStatic((prev) => !prev);
    if (!isStatic) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  const sidebarWidth = isStatic ? 200 : isHovered ? 200 : 0;

  return (
    <>
      {/* Small arrow button fixed in middle left, only if not static */}
      {!isStatic && (
        <motion.div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed top-1/2 left-0 z-50 cursor-pointer bg-slate-900 text-slate-400 rounded-r-md p-2 shadow-lg"
          style={{ translateY: '-50%' }}
        >
          {isHovered ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
        </motion.div>
      )}

      {/* Sidebar */}
      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: sidebarWidth }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="h-screen bg-slate-900 border-r border-slate-800 backdrop-blur-md shadow-lg flex flex-col shrink-0 overflow-hidden"
        style={{ whiteSpace: 'nowrap' }}
      >
        {/* Hamburger toggle button */}
        <div className="p-3 flex justify-start items-center border-b border-slate-800">
          <button
            onClick={toggleStatic}
            className="text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FaBars size={24} />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-5 mt-2">
          {navLinks.map(({ icon, label, path }, index) => (
            <NavLink key={index} to={path}>
              {({ isActive }) => (
                <motion.div
                  className={`flex items-center gap-3 py-2.5 px-2 rounded-md text-sm transition-all duration-200 cursor-pointer
                    justify-start
                    ${isActive ? "bg-cyan-500/10 text-cyan-300" : "text-slate-400 hover:bg-slate-800"}`}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-lg">{icon}</span>
                  {sidebarWidth > 64 && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-2 py-4 space-y-3">
          <button
            onClick={() => {}}
            className={`flex items-center gap-3 w-full py-2 px-2 rounded-md text-sm transition
              justify-start
              text-yellow-300 hover:bg-slate-800`}
          >
            <FaSun />
            {sidebarWidth > 64 && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                Light Mode
              </motion.span>
            )}
          </button>

          <button
            className={`flex items-center gap-3 w-full py-2 px-2 text-rose-300 rounded-md text-sm transition
              justify-start hover:bg-rose-400/10`}
          >
            <FaPowerOff />
            {sidebarWidth > 64 && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                Log out
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
