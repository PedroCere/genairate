import { useEditor } from '../../context/EditorContext';

export default function EditorToolbar() {
  const {
    article,
    setTitle,
    saveDraft,
    publishArticle,
    aiActions,
    updateArticle // Función añadida del contexto
  } = useEditor();

  return (
    <div className="flex items-center justify-between p-4 bg-[#2C3A50] border-b border-secondary/20">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={article?.title || ''}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del artículo"
          className="bg-transparent text-2xl font-bold text-text placeholder-secondary focus:outline-none"
        />
        
        <select
          value={article?.tone || 'profesional'}
          onChange={(e) => updateArticle({ tone: e.target.value })}
          className="bg-background text-text px-3 py-1 rounded-lg"
        >
          <option value="profesional">Profesional</option>
          <option value="creativo">Creativo</option>
          <option value="seo">SEO</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={saveDraft}
          className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-all"
        >
          Guardar
        </button>
        <button
          onClick={publishArticle}
          className="bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
        >
          Publicar
        </button>
      </div>
    </div>
  );
}