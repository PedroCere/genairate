import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import GenerateBlogModal from '../common/modals/GenerateBlogModal';
import LoadingSpinner from '../common/LoadingSpinner';

export default function EditorToolbar({ onGenerate }) {
  const {
    currentArticle: article,
    setTitle,
    saveCurrentAsDraft: saveDraft,
    publishCurrentArticle: publishArticle,
    updateArticle,
    generateInitialArticle,
  } = useEditor();

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async ({ topic, tone, language }) => {
    try {
      setLoadingGenerate(true);
      const userInput = topic;

      if (onGenerate && topic) {
        await onGenerate({ userInput, tone, language });
      } else {
        await generateInitialArticle({
          userInput,
          tone,
          language,
          format: 'lista',
          templateId: 1,
        });
      }

      setShowBlogModal(false);
    } catch (error) {
      console.error('Error generating article:', error);
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraft();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-surface-card border-b border-border rounded-t-xl text-text dark:text-text dark:bg-surface-card shadow-subtle">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={article?.title || ''}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del artículo"
            className="bg-transparent text-2xl font-bold text-text placeholder-muted focus:outline-none"
          />

          <select
            value={article?.tone || 'profesional'}
            onChange={(e) => updateArticle({ ...article, tone: e.target.value })}
            className="bg-white dark:bg-white text-dark dark:text-black px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
          >
            <option value="profesional">Profesional</option>
            <option value="creativo">Creativo</option>
            <option value="seo">SEO</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSaveDraft}
            className={`px-4 py-2 rounded-lg transition-colors ${
              saved
                ? 'bg-green-500 text-white animate-pulse'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
            disabled={saved}
          >
            Guardar
          </button>
          <button
            onClick={publishArticle}
            className="bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Publicar
          </button>
          <button
            onClick={() => setShowBlogModal(true)}
            className="flex items-center justify-center bg-secondary text-background px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
            disabled={loadingGenerate}
          >
            {loadingGenerate ? (
              <LoadingSpinner size="sm" />
            ) : (
              '🤖 Blog automático'
            )}
          </button>
        </div>
      </div>

      {showBlogModal && (
        <GenerateBlogModal
          onGenerate={handleGenerate}
          onClose={() => setShowBlogModal(false)}
        />
      )}
    </>
  );
}
