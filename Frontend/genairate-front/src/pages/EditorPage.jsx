import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor } from '../context/EditorContext';
import EditorToolbar from '../components/editor/EditorToolBar';
import AiSideBar from '../components/ai/AiSideBar';
import ContentPreview from '../components/editor/ContentPreview';
import TipTapEditor from '../components/editor/TipTapEditor';
import { getById } from '../services/ContentService';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function EditorPage() {
  const { id } = useParams();
  const {
    currentArticle,
    updateSectionContent,
    generateInitialArticle,
    setActiveSectionId,
    updateArticle,
    aiActions,
  } = useEditor();

  const [isLoading, setIsLoading] = useState(!!id);
  const [editorContent, setEditorContent] = useState(currentArticle?.sections?.[0]?.content || '');

  useEffect(() => {
    if (id) {
      const loadArticle = async () => {
        try {
          const articleData = await getById(id);
          // Map ContentResponse fields into sections array for editor
          const sections = [
            {
              id: 'section-1',
              content: articleData.introduction || '',
            },
            {
              id: 'section-2',
              content: articleData.content1 || '',
            },
            {
              id: 'section-3',
              content: articleData.content2 || '',
            },
            {
              id: 'section-4',
              content: articleData.content3 || '',
            },
            {
              id: 'section-5',
              content: articleData.conclusion || '',
            },
          ];

          updateArticle({
            ...articleData,
            sections,
          });

          setEditorContent(sections[0].content);
        } catch (error) {
          console.error('Error loading article:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadArticle();
    }
  }, [id, updateArticle]);

  const handleContentChange = (newContent) => {
    setEditorContent(newContent);
    if (currentArticle.sections && currentArticle.sections.length > 0) {
      updateSectionContent(currentArticle.sections[0].id, newContent);
    }
  };

  // Helper function to combine article title and sections into a single HTML string
  const combineArticleContent = (article) => {
    if (!article) return '';

    const { title, introduction, subtitle1, content1, subtitle2, content2, subtitle3, content3, conclusion } = article;

    let html = '';

    if (title) {
      html += `<h1>${title}</h1>`;
    }
    if (introduction) {
      html += `<p>${introduction}</p>`;
    }
    if (subtitle1) {
      html += `<h2>${subtitle1}</h2>`;
    }
    if (content1) {
      html += `<p>${content1}</p>`;
    }
    if (subtitle2) {
      html += `<h2>${subtitle2}</h2>`;
    }
    if (content2) {
      html += `<p>${content2}</p>`;
    }
    if (subtitle3) {
      html += `<h2>${subtitle3}</h2>`;
    }
    if (content3) {
      html += `<p>${content3}</p>`;
    }
    if (conclusion) {
      html += `<p>${conclusion}</p>`;
    }

    return html;
  };

  const handleGenerateInitial = async () => {
    try {
      const response = await generateInitialArticle({
        userInput: currentArticle?.title || 'Tema del artículo',
        tone: 'profesional',
        language: 'es',
        format: 'lista',
        templateId: 1,
      });

      console.log('Generate response:', response);
      console.log('Generate response id:', response?.id);

      // Fetch full article by id after generation
      if (!response?.id) {
        console.error('No id returned from generateInitialArticle, skipping getById');
        return;
      }
      const fullArticle = await getById(response.id);

      updateArticle(fullArticle);

      // Combine all article parts into a single HTML string for the editor
      const combinedContent = combineArticleContent(fullArticle);

      setEditorContent(combinedContent);
    } catch (error) {
      console.error('Error generating initial article:', error);
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] gap-6 mt-6 overflow-auto">
        <AiSideBar />

        <div className="bg-surface-card rounded-xl shadow-subtle p-6">
          <TipTapEditor
            content={editorContent}
            onUpdate={handleContentChange}
          />
        </div>

        <ContentPreview />
      </div>
    </div>
  );
}
