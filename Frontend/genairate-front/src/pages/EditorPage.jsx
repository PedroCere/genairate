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

export default function EditorPage() {
  const { id } = useParams();
  const {
    currentArticle,
    updateSectionContent,
    generateInitialArticle,
    updateArticle,
  } = useEditor();

  const [isLoading, setIsLoading] = useState(!!id);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef();

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

  const handleGenerateInitial = async ({ userInput, tone, language }) => {
    try {
      const response = await generateInitialArticle({
        userInput,
        tone,
        language,
        format: 'lista',
        templateId: 1,
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
      <EditorToolbar onGenerate={handleGenerateInitial} />
      
      {/* Imagen sugerida basada en palabras clave */}
      {currentArticle?.keywords && (
        <div className="mb-6">
          <ImageSuggestions keywords={currentArticle.keywords} />
        </div>
      )}

      {/* Layout con editor + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_2fr_1fr] gap-6 mt-6 overflow-auto">
        <AiSideBar />

        <div className="bg-surface-card rounded-xl shadow-subtle p-6 min-h-[600px]">
          <TipTapEditor
            ref={editorRef}
            content={editorContent}
            onUpdate={(newContent) => setEditorContent(newContent)}
          />
        </div>
        {/* Sidebar de formato */}
        <FormatSidebar editor={editorRef} />
      </div>
    </div>
  );
}
