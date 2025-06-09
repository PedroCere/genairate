import React, { useState } from 'react';
import AccountPage from './AccountPage';
import PreferencesSection from '../components/preferences/PreferencesSection';
import NotificationsSection from '../components/preferences/NotificationsSection';
import { useTranslation } from 'react-i18next';

const tabs = ['Account', 'Preferences', 'Notifications', 'Security'];

export default function SettingsUnifiedPage() {
  const [activeTab, setActiveTab] = useState('Account');
  const { t } = useTranslation();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AccountPage embedded />;
      case 'Preferences':
        return <PreferencesSection />;
      case 'Notifications':
        return <NotificationsSection />;
      default:
        return <div className="text-gray-600 dark:text-gray-400 p-6">Próximamente</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{t('SettingsTitle')}</h1>

      <nav className="border-b border-gray-300 dark:border-gray-700 mb-6">
        <ul className="flex space-x-6 text-sm font-medium">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {t(tab)}
            </li>
          ))}
        </ul>
      </nav>

      <div>{renderTabContent()}</div>
    </div>
  );
}
