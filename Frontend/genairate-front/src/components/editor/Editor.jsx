import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Editor = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">{t('EditorTitle')}</h1>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
        value={content}
        onChange={handleChange}
        placeholder={t('EditorPlaceholder')}
      />
    </div>
  );
};

export default Editor;
