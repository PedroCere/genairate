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
    article,
    updateSectionContent,
    generateInitialArticle,
    setActiveSectionId,
    updateArticle,
    aiActions,
  } = useEditor();

  const [isLoading, setIsLoading] = useState(!!id);
  const [editorContent, setEditorContent] = useState(article?.sections?.[0]?.content || '');

  useEffect(() => {
    if (id) {
      const loadArticle = async () => {
        try {
          const articleData = await getById(id);
          const sections = Array.isArray(articleData.sections) ? articleData.sections : [];
          const content = sections.length > 0 ? sections[0]?.content || '' : '';

          updateArticle({
            ...articleData,
            sections: sections.map((section, index) => ({
              ...section,
              content: index === 0 ? content : section.content,
            })),
          });

          setEditorContent(content);
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
    if (article.sections && article.sections.length > 0) {
      updateSectionContent(article.sections[0].id, newContent);
    }
  };

  const handleGenerateInitial = async () => {
    await generateInitialArticle(article.title || 'Tema del artículo');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <AiSideBar />

      <div className="flex-1 flex flex-col">
        <EditorToolbar onGenerate={handleGenerateInitial} />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-auto">
          <div className="bg-[#2C3A50] rounded-xl shadow-xl p-4">
            <TipTapEditor
              content={editorContent}
              onUpdate={handleContentChange}
            />
          </div>

          <ContentPreview />
        </div>
      </div>
    </div>
  );
}
