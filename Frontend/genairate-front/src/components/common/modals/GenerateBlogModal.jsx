import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Dropdown from '../ui/Dropdown';
import { contentService } from '../../../services/ContentService';

export default function GenerateBlogModal({ onGenerate, onClose }) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('informativo');
  const [language, setLanguage] = useState('es');

  const handleGenerate = async () => {
    const data = { topic: prompt, tone, language };
    const article = await contentService.generateArticle(data);
    onGenerate(article); // Puede actualizar context o redirigir
    onClose();
  };

  return (
    <div className="modal p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('CreateBlogWithAI')}</h2>
      <Input placeholder={t('ArticleTopic')} value={prompt} onChange={e => setPrompt(e.target.value)} />
      <Dropdown label={t('Tone')} options={[t('Informative'), t('Persuasive'), t('Casual')]} value={tone} onChange={setTone} />
      <Dropdown label={t('Language')} options={['es', 'en']} value={language} onChange={setLanguage} />
      <div className="flex justify-end mt-4">
        <Button onClick={onClose} variant="ghost">{t('Cancel')}</Button>
        <Button onClick={handleGenerate} className="ml-2">{t('Generate')}</Button>
      </div>
    </div>
  );
}
