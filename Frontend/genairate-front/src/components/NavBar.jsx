import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import profile2 from "../assets/profile2.jpg";
import {
  FiSearch,
  FiBell,
  FiEdit3,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiBookOpen,
  FiBarChart2,
  FiHelpCircle,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDropdown = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-white" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Izquierda - Logo + Search */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-2xl font-serif font-bold text-black">
            GenAirate
          </NavLink>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-64 text-sm rounded-full border bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-700" />
          </div>
        </div>

        {/* Derecha - Acciones */}
        <div className="flex items-center gap-5 ml-auto">

          {/* Botón Write */}
          <NavLink
            to="/write"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black"
          >
            <FiEdit3 className="text-xl" />
            Write
          </NavLink>

          {/* Notificación */}
          <button className="text-gray-600 hover:text-black">
            <FiBell className="text-xl" />
          </button>

          {/* Perfil con dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <img
                src={profile2}
                alt="User"
                className="h-8 w-8 rounded-full object-cover border"
              />
              <FiChevronDown className="text-gray-500" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 mt-2 w-64 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 text-sm text-muted text-gray-600">
                    Signed in as <strong>Santino</strong>
                  </div>
                  <hr className="border-[var(--color-border)]" />

                  <NavLink to="/profile" className="dropdown-item">
                    <FiUser /> Profile
                  </NavLink>
                  <NavLink to="/library" className="dropdown-item">
                    <FiBookOpen /> Library
                  </NavLink>
                  <NavLink to="/stories" className="dropdown-item">
                    <FiEdit3 /> Stories
                  </NavLink>
                  <NavLink to="/stats" className="dropdown-item">
                    <FiBarChart2 /> Stats
                  </NavLink>
                  <hr className="border-[var(--color-border)]" />
                  <NavLink to="/settings" className="dropdown-item">
                    <FiSettings /> Settings
                  </NavLink>
                  <NavLink to="/help" className="dropdown-item">
                    <FiHelpCircle /> Help
                  </NavLink>
                  <hr className="border-[var(--color-border)]" />
                  <button className="dropdown-item text-red-500 hover:bg-red-100">
                    <FiLogOut /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
