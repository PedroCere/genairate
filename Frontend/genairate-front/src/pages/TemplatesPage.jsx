import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as TemplateService from '../services/TemplateService';


const articleLengths = ['corto', 'mediano', 'largo'];
const textStyles = ['formal', 'informal', 'analítico'];
const languages = ['español', 'ingles'];

export default function TemplatesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);

  const emptyForm = {
    id: null,
    name: '',
    tone: '',
    language: '',
    length: '',
    extraInstructions: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      TemplateService.getTemplatesByUser(user.id)
        .then((data) => setTemplates(data))
        .catch((err) => {
          console.error('Error loading templates:', err);
          alert(t('ErrorLoadingTemplates'));
        })
        .finally(() => setLoading(false));
    }
  }, [user, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (template) => {
    setForm({
      id: template.id || null,
      name: template.name || '',
      tone: template.tone || '',
      language: template.language || '',
      length: template.length || '',
      extraInstructions: template.extraInstructions || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!form.name || !form.tone || !form.language || !form.length) {
      alert(t('PleaseCompleteAllFields'));
      return;
    }
    if (!user?.id) {
      alert(t('UserNotLoggedIn'));
      return;
    }

    setLoading(true);
    const action = form.id
      ? TemplateService.updateTemplate(form.id, user.id, form)
      : TemplateService.createTemplate(user.id, form);

    action
      .then((result) => {
        if (!form.id) {
          setTemplates((prev) => [...prev, { ...form, id: result }]);
        } else {
          setTemplates((prev) =>
            prev.map((t) => (t.id === form.id ? { ...form } : t))
          );
        }
        setForm(emptyForm);
      })
      .catch((err) => {
        console.error('Error saving template:', err);
        alert(form.id ? t('ErrorUpdatingTemplate') : t('ErrorCreatingTemplate'));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <PlusCircle className="text-primary" />
        {t('TemplatesPageTitle')}
      </h1>

      {/* Template Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {form.id ? t('EditTemplate') : t('CreateTemplate')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder={t('TemplateName')}
            value={form.name}
            onChange={handleInputChange}
            disabled={loading}
            className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2"
          />
          <select
            name="tone"
            value={form.tone}
            onChange={handleInputChange}
            disabled={loading}
            className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2"
          >
            <option value="">{t('SelectStyle')}</option>
            {textStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
          <select
            name="language"
            value={form.language}
            onChange={handleInputChange}
            disabled={loading}
            className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2"
          >
            <option value="">{t('SelectLanguage')}</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <select
            name="length"
            value={form.length}
            onChange={handleInputChange}
            disabled={loading}
            className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2"
          >
            <option value="">{t('SelectLength')}</option>
            {articleLengths.map((len) => (
              <option key={len} value={len}>{len}</option>
            ))}
          </select>
          <input
            type="text"
            name="extraInstructions"
            placeholder={t('ExtraInstructions')}
            value={form.extraInstructions}
            onChange={handleInputChange}
            disabled={loading}
            className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 col-span-1 sm:col-span-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-primary bg-white dark:bg-gray-900 border px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          disabled={loading}
        >
          {form.id ? t('UpdateTemplate') : t('SaveTemplate')}
        </button>
      </div>

      {/* Template List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('TemplatesList')}</h2>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('LoadingTemplates')}
          </p>
        ) : templates.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('NoTemplatesAvailable')}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  🧠 {t('TextStyle')}: {template.tone || '—'} <br />
                  ✏️ {t('Length')}: {template.length || '—'} <br />
                  🌍 {t('Language')}: {template.language || '—'} <br />
                  💬 {t('Instructions')}: {template.extraInstructions || t('None')}
                </p>
                <button
                  onClick={() => handleEdit(template)}
                  className="mt-3 text-blue-600 hover:underline text-sm"
                  disabled={loading}
                >
                  ✏️ {t('Edit')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
