import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useFontSize } from './components/FontSizeContext';

export default function Layout() {
  const { getFontSizeClass } = useFontSize();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (saved === 'false') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
      setDarkMode(true);
    }
  };

  return (
    <div className={`${getFontSizeClass()} min-h-screen flex font-sans bg-white dark:bg-gray-900 dark:text-white overflow-hidden`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex-1 flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-6 md:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
