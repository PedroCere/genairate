import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const mockedTemplates = [
  {
    id: '1',
    name: 'Plantilla Guía Básica',
    sectionsCount: 3,
    articleType: 'guía',
    textStyle: 'formal',
  },
  {
    id: '2',
    name: 'Plantilla Lista de Consejos',
    sectionsCount: 5,
    articleType: 'lista',
    textStyle: 'informal',
  },
  {
    id: '3',
    name: 'Plantilla Análisis Profundo',
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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sectionsCount' ? Number(value) : value,
    }));
  }

  function handleEdit(template) {
    setForm(template);
  }

  function handleSave() {
    if (!form.name || !form.articleType || !form.textStyle || form.sectionsCount < 1) {
      alert(t('PleaseCompleteAllFields'));
      return;
    }

    if (form.id) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === form.id ? { ...form } : t))
      );
    } else {
      const newTemplate = {
        ...form,
        id: Date.now().toString(),
      };
      setTemplates((prev) => [...prev, newTemplate]);
    }

    setForm({
      id: null,
      name: '',
      sectionsCount: 1,
      articleType: '',
      textStyle: '',
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-serif font-semibold mb-8">
        {t('TemplatesPageTitle')}
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('CreateEditTemplate')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">{t('TemplateName')}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('SectionsCount')}</label>
            <input
              type="number"
              name="sectionsCount"
              min={1}
              value={form.sectionsCount}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('ArticleType')}</label>
            <select
              name="articleType"
              value={form.articleType}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">{t('Select')}</option>
              {articleTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('TextStyle')}</label>
            <select
              name="textStyle"
              value={form.textStyle}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="">{t('Select')}</option>
              {textStyles.map((style) => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('SaveTemplate')}
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">{t('TemplatesList')}</h2>
        {templates.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t('NoTemplatesAvailable')}
          </p>
        ) : (
          <ul className="space-y-4">
            {templates.map((template) => (
              <li
                key={template.id}
                className="border rounded-md p-4 bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('Sections')}: {template.sectionsCount} • {t('Type')}: {template.articleType.charAt(0).toUpperCase() + template.articleType.slice(1)} • {t('TextStyle')}: {template.textStyle.charAt(0).toUpperCase() + template.textStyle.slice(1)}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(template)}
                  className="text-blue-600 hover:underline"
                >
                  {t('Edit')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
