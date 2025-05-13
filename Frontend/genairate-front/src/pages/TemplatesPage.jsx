import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle } from 'lucide-react';

const mockedTemplates = [
  {
    id: '1',
    name: 'Guía Básica',
    sectionsCount: 3,
    articleType: 'guía',
    textStyle: 'formal',
  },
  {
    id: '2',
    name: 'Lista de Consejos',
    sectionsCount: 5,
    articleType: 'lista',
    textStyle: 'informal',
  },
  {
    id: '3',
    name: 'Análisis Profundo',
    sectionsCount: 4,
    articleType: 'análisis',
    textStyle: 'analítico',
  },
];

const articleTypes = ['guía', 'lista', 'análisis'];
const textStyles = ['formal', 'informal', 'analítico'];

export default function TemplatesPage() {
  const { t } = useTranslation();
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    sectionsCount: 1,
    articleType: '',
    textStyle: '',
  });

  useEffect(() => {
    setTemplates(mockedTemplates);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sectionsCount' ? Number(value) : value,
    }));
  };

  const handleEdit = (template) => {
    setForm(template);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    if (!form.name || !form.articleType || !form.textStyle || form.sectionsCount < 1) {
      alert(t('PleaseCompleteAllFields'));
      return;
    }

    if (form.id) {
      setTemplates((prev) => prev.map((t) => (t.id === form.id ? { ...form } : t)));
    } else {
      const newTemplate = { ...form, id: Date.now().toString() };
      setTemplates((prev) => [...prev, newTemplate]);
    }

    setForm({ id: null, name: '', sectionsCount: 1, articleType: '', textStyle: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <PlusCircle className="text-primary" />
        {t('TemplatesPageTitle')}
      </h1>

      {/* Editor de Plantilla */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{form.id ? t('EditTemplate') : t('CreateTemplate')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder={t('TemplateName')}
            value={form.name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="number"
            name="sectionsCount"
            min={1}
            placeholder={t('SectionsCount')}
            value={form.sectionsCount}
            onChange={handleInputChange}
            className="input"
          />
          <select name="articleType" value={form.articleType} onChange={handleInputChange} className="input">
            <option value="">{t('SelectType')}</option>
            {articleTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select name="textStyle" value={form.textStyle} onChange={handleInputChange} className="input">
            <option value="">{t('SelectStyle')}</option>
            {textStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          {form.id ? t('UpdateTemplate') : t('SaveTemplate')}
        </button>
      </div>

      {/* Lista de Plantillas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('TemplatesList')}</h2>
        {templates.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">{t('NoTemplatesAvailable')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📄 {t('Sections')}: {template.sectionsCount}<br />
                  ✏️ {t('Type')}: {template.articleType}<br />
                  🧠 {t('TextStyle')}: {template.textStyle}
                </p>
                <button
                  onClick={() => handleEdit(template)}
                  className="mt-3 text-blue-600 hover:underline text-sm"
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
