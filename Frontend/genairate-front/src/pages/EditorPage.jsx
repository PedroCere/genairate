import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor } from '../context/EditorContext';
import { deserializeContent, serializeContent } from '../utils/slateHelpers';
import EditorToolbar from '../components/editor/EditorToolBar';
import AiSideBar from '../components/ai/AiSideBar';
import ContentPreview from '../components/editor/ContentPreview';
import RichEditor from '../components/editor/RichEditor';
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
    aiActions
  } = useEditor();
  
  const [isLoading, setIsLoading] = useState(!!id);
  const [slateValue, setSlateValue] = useState(deserializeContent(article.sections[0]?.content || ''));

  useEffect(() => {
    if (id) {
      const loadArticle = async () => {
        try {
          const articleData = await getById(id);
          const content = deserializeContent(articleData.sections[0].content);
          
          updateArticle({
            ...articleData,
            sections: articleData.sections.map((section, index) => ({
              ...section,
              content: index === 0 ? content : section.content
            }))
          });
          
          setSlateValue(content);
        } catch (error) {
          console.error('Error loading article:', error);
        } finally {
          setIsLoading(false);
        }
      };
      loadArticle();
    }
  }, [id, updateArticle]);

  const handleContentChange = (newValue) => {
    setSlateValue(newValue);
    const plainText = serializeContent(newValue);
    updateSectionContent(article.sections[0].id, plainText);
  };

  const handleGenerateInitial = async () => {
    await generateInitialArticle(article.title || 'Tema del artículo');
    setSlateValue(deserializeContent(article.sections[0].content));
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
      <AISidebar />
      
      <div className="flex-1 flex flex-col">
        <EditorToolbar onGenerate={handleGenerateInitial} />
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-auto">
          {/* Editor principal */}
          <div className="bg-[#2C3A50] rounded-xl shadow-xl p-4">
            <RichEditor
              value={slateValue}
              onChange={handleContentChange}
              onKeyDown={(event) => {
                if (event.key === '/' && event.ctrlKey) {
                  event.preventDefault();
                  aiActions.openAIMenu();
                }
              }}
            />
          </div>
          
          {/* Vista previa */}
          <ContentPreview />
        </div>
      </div>
    </div>
  );
}