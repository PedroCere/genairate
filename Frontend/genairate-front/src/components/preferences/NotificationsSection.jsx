import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const mockNotificationPreferences = {
  emailNotifications: true,
  pushNotifications: false,
  newsletterSubscription: true,
};

const userService = {
  getNotificationPreferences: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(mockNotificationPreferences), 500);
    }),
  updateNotificationPreferences: (prefs) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(prefs), 500);
    }),
};

export default function NotificationsSection() {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    pushNotifications: false,
    newsletterSubscription: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    userService.getNotificationPreferences().then((prefs) => {
      setPreferences(prefs);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    userService.updateNotificationPreferences(preferences).then(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-700 dark:text-gray-300">
        {t('LoadingNotificationPreferences')}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="emailNotifications"
            name="emailNotifications"
            checked={preferences.emailNotifications}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label htmlFor="emailNotifications" className="font-medium">
            {t('EmailNotifications')}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="pushNotifications"
            name="pushNotifications"
            checked={preferences.pushNotifications}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label htmlFor="pushNotifications" className="font-medium">
            {t('PushNotifications')}
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="newsletterSubscription"
            name="newsletterSubscription"
            checked={preferences.newsletterSubscription}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label htmlFor="newsletterSubscription" className="font-medium">
            {t('NewsletterSubscription')}
          </label>
        </div>

        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition disabled:opacity-50"
          >
            {saving ? t('Saving') : t('SaveNotificationPreferences')}
          </button>
          {saveSuccess && (
            <p className="mt-2 text-green-600 dark:text-green-400 font-medium">
              {t('NotificationPreferencesSaved')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
