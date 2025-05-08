import React from 'react';

export default function ArticleTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-6 border-b mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={
            activeTab === tab
              ? "pb-2 text-sm whitespace-nowrap border-b-2 border-black dark:border-white font-semibold"
              : "pb-2 text-sm whitespace-nowrap text-gray-500 hover:text-gray-800 dark:hover:text-white"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
