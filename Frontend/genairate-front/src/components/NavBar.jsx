import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import profile2 from "../assets/profile1.jpg";
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
import { useTranslation } from "react-i18next";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toggleDropdown = () => setMenuOpen(!menuOpen);
  const toggleLangDropdown = () => setLangMenuOpen(!langMenuOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className="text-2xl font-serif font-bold text-black dark:text-white"
          >
            {t("GenAirate")}
          </NavLink>
          <div className="relative">
            <input
              type="text"
              placeholder={t("Search")}
              className="pl-10 pr-4 py-2 w-64 text-sm rounded-full border bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-700 dark:text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-5 ml-auto">
          <NavLink
            to="/editor"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <FiEdit3 className="text-xl" />
            {t("Write")}
          </NavLink>

          <button className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
            <FiBell className="text-xl" />
          </button>

          <button
            onClick={toggleDarkMode}
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>

          {/* Language selector dropdown */}
          <div className="relative">
            <button
              onClick={toggleLangDropdown}
              className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {t("Language")}
              <FiChevronDown className="text-gray-500 dark:text-gray-400" />
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("English")}
                  </button>
                  <button
                    onClick={() => changeLanguage("es")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t("Spanish")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <img
                src={profile2}
                alt="User"
                className="h-8 w-8 rounded-full object-cover border dark:border-gray-600"
              />
              <FiChevronDown className="text-gray-500 dark:text-gray-400" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="px-4 py-2 text-sm text-muted text-gray-600 dark:text-gray-300">
                    {t("SignedInAs")} <strong>Santino</strong>
                  </div>
                  <hr className="border-gray-300 dark:border-gray-700" />

                  <NavLink to="/profile/aguspaltrucci" className="dropdown-item dark:text-gray-300">
                    <FiUser /> {t("Profile")}
                  </NavLink>
                  <NavLink to="/library" className="dropdown-item dark:text-gray-300">
                    <FiBookOpen /> {t("Library")}
                  </NavLink>
                  <NavLink to="/history" className="dropdown-item dark:text-gray-300">
                    <FiEdit3 /> {t("Stories")}
                  </NavLink>
                  <NavLink to="/analytics" className="dropdown-item dark:text-gray-300">
                    <FiBarChart2 /> {t("Stats")}
                  </NavLink>
                  <hr className="border-gray-300 dark:border-gray-700" />
                  <NavLink to="/settings" className="dropdown-item dark:text-gray-300">
                    <FiSettings /> {t("Settings")}
                  </NavLink>
                  <NavLink to="/help" className="dropdown-item dark:text-gray-300">
                    <FiHelpCircle /> {t("Help")}
                  </NavLink>
                  <hr className="border-gray-300 dark:border-gray-700" />
                  <button className="dropdown-item text-red-500 hover:bg-red-100 dark:hover:bg-red-700">
                    <FiLogOut /> {t("SignOut")}
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
