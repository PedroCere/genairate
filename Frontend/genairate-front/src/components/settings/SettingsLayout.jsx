import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function SettingsLayout() {
  const activeClass = "pb-2 border-b-2 border-black dark:border-white text-black dark:text-white";
  const inactiveClass = "pb-2 border-b-2 border-transparent text-gray-500 hover:text-black dark:hover:text-white";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <nav className="flex space-x-6 border-b mb-6 text-sm font-medium">
        <NavLink
          to="/settings/account"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Account
        </NavLink>
        <NavLink
          to="/settings/preferences"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Preferences
        </NavLink>
        <NavLink
          to="/settings/notifications"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Notifications
        </NavLink>
        <NavLink
          to="/settings/security"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          Security
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
