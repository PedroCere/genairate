import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor } from '../context/EditorContext';
import EditorToolbar from '../components/editor/EditorToolBar';
import AiSideBar from '../components/ai/AiSideBar';
import TipTapEditor from '../components/editor/TipTapEditor';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImageSuggestions from '../components/ImageSuggestions';
import { getById } from '../services/ContentService';
import FormatSidebar from '../components/editor/FormatSidebar';
import * as TemplateService from '../services/TemplateService';
import { useAuth } from '../context/AuthContext';

export default function EditorPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const {
    currentArticle,
    updateSectionContent,
    generateInitialArticle,
    updateArticle,
  } = useEditor();

  const [isLoading, setIsLoading] = useState(!!id);
  const [editorContent, setEditorContent] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    if (user?.id) {
      TemplateService.getTemplatesByUser(user.id)
        .then((data) => {
          setTemplates(data);
          if (data.length > 0) {
            setSelectedTemplateId(data[0].id);
          }
        })
        .catch((err) => {
          console.error('Error loading templates:', err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      const loadArticle = async () => {
        try {
          const articleData = await getById(id);
          updateArticle(articleData);
          const html = combineArticleContent(articleData);
          setEditorContent(html);
        } catch (error) {
          console.error('Error loading article:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadArticle();
    }
  }, [id, updateArticle]);

  const handleGenerateInitial = async ({ userInput, tone, language, templateId }) => {
    try {
      const response = await generateInitialArticle({
        userInput,
        tone,
        language,
        format: 'lista',
        templateId,
      });

      if (!response?.id) return;
      const fullArticle = await getById(response.id);
      updateArticle(fullArticle);
      setEditorContent(combineArticleContent(fullArticle));
    } catch (error) {
      console.error('Error generating initial article:', error);
    }
  };

  const combineArticleContent = (article) => {
    if (!article) return '';
    const safeText = (text) => text || '';
    const {
      title, introduction, subtitle1, content1,
      subtitle2, content2, subtitle3, content3, conclusion
    } = article;

    return `
      <h1>${safeText(title)}</h1>
      <p>${safeText(introduction)}</p>
      <h2>${safeText(subtitle1)}</h2>
      <p>${safeText(content1)}</p>
      <h2>${safeText(subtitle2)}</h2>
      <p>${safeText(content2)}</p>
      <h2>${safeText(subtitle3)}</h2>
      <p>${safeText(content3)}</p>
      <p><strong>${safeText(conclusion)}</strong></p>
    `;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <div className="mb-4">
        <label htmlFor="template-select" className="block mb-1 font-semibold">
          Seleccione una plantilla:
        </label>
        <select
          id="template-select"
          className="input bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2"
          value={selectedTemplateId || ''}
          onChange={(e) => setSelectedTemplateId(Number(e.target.value))}
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <EditorToolbar
        onGenerate={handleGenerateInitial}
        selectedTemplateId={selectedTemplateId}
      />

      {currentArticle?.keywords && (
        <div className="mb-6">
          <ImageSuggestions keywords={currentArticle.keywords} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px_2fr_1fr] gap-6 mt-6 overflow-auto">
        <AiSideBar />
        <div className="bg-surface-card rounded-xl shadow-subtle p-6 min-h-[600px]">
          <TipTapEditor
            ref={editorRef}
            content={editorContent}
            onUpdate={(newContent) => setEditorContent(newContent)}
          />
        </div>
        <FormatSidebar editor={editorRef} />
      </div>
    </div>
  );
}
