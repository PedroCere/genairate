import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaPowerOff,
  FaSun,
  FaMoon,
  FaChevronRight,
  FaChevronLeft,
  FaBars,
  FaChartLine,
  FaFeatherAlt,
  FaListUl,
  FaFolderOpen,
  FaCogs,
  FaUser,
  FaHome
} from "react-icons/fa";

const navLinks = [
  { icon: FaHome, label: "Inicio", path: "/" },
  { icon: FaChartLine, label: "Dashboard", path: "/dashboard" },
  { icon: FaFeatherAlt, label: "Editor", path: "/editor" },
  { icon: FaListUl, label: "Analytics", path: "/analytics" },
  { icon: FaFolderOpen, label: "History", path: "/history" },
  { icon: FaListUl, label: "Templates", path: "/templates" },
  { icon: FaCogs, label: "Settings", path: "/settings" },
  { icon: FaUser, label: "Account", path: "/account" }
];

export default function Sidebar({ darkMode, toggleDarkMode }) {
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
      {!isStatic && (
        <motion.div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed top-1/2 left-0 z-50 cursor-pointer rounded-r-md p-2 shadow-lg"
          style={{ translateY: '-50%', backgroundColor: 'var(--color-sidebar-bg)', color: 'var(--color-text)' }}
        >
          {isHovered ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
        </motion.div>
      )}

      <motion.aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: sidebarWidth }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="h-screen border-r backdrop-blur-md shadow-lg flex flex-col shrink-0 overflow-hidden"
        style={{ whiteSpace: 'nowrap', backgroundColor: 'var(--color-sidebar-bg)', borderColor: 'var(--color-secondary)', color: 'var(--color-text)' }}
      >
        <div className="p-3 flex justify-start items-center border-b" style={{ borderColor: 'var(--color-secondary)' }}>
          <button
            onClick={toggleStatic}
            className="focus:outline-none"
            aria-label="Toggle sidebar"
            style={{ color: 'var(--color-text)' }}
          >
            <FaBars size={24} />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-5 mt-2">
          {navLinks.map(({ icon, label, path }, index) => (
            <NavLink key={index} to={path} end>
              {({ isActive }) => (
                <motion.div
                  className="flex items-center gap-3 py-2.5 px-2 rounded-md text-sm transition-all duration-200 cursor-pointer justify-start"
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? 'var(--color-background)' : 'var(--color-text-lightmode)'
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-lg">{React.createElement(icon)}</span>
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
            onClick={toggleDarkMode}
            className="flex items-center gap-3 w-full py-2 px-2 rounded-md text-sm transition justify-start"
            style={{ color: darkMode ? 'var(--color-primary)' : 'var(--color-secondary)' }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {sidebarWidth > 64 && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </motion.span>
            )}
          </button>

          <button
            className="flex items-center gap-3 w-full py-2 px-2 rounded-md text-sm transition justify-start hover:bg-rose-400/10"
            style={{ color: 'var(--color-danger)' }}
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
