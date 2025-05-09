import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import GenerateBlogModal from '../common/modals/GenerateBlogModal';

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

  const handleGenerate = async ({ topic, tone, language }) => {
    try {
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
            onClick={saveDraft}
            className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
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
            className="bg-secondary text-background px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            🤖 Blog automático
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
