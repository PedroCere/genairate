import { useEditor } from '../../context/EditorContext';
import React from 'react';


export default function AISideBar() {
  const { aiActions, article, selectedText } = useEditor();

  return (
    <div className="w-80 bg-background border-l border-secondary/20 p-4 space-y-6">
      <h3 className="text-xl font-bold text-text">Asistente de IA</h3>
      
      <div className="space-y-4">
        <div className="bg-[#2C3A50] p-4 rounded-xl">
          <h4 className="text-sm font-medium text-secondary mb-2">Acciones rápidas</h4>
          <button
            onClick={() => aiActions.rewriteText(selectedText, article.tone)}
            className="w-full bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-all"
          >
            Reescribir selección
          </button>
          <button
            onClick={aiActions.summarizeText}
            className="w-full bg-accent/10 text-accent p-2 rounded-lg hover:bg-accent/20 mt-2 transition-all"
          >
            Resumir sección
          </button>
        </div>

        <div className="bg-[#2C3A50] p-4 rounded-xl">
          <h4 className="text-sm font-medium text-secondary mb-2">Generar imagen</h4>
          <button
            onClick={() => aiActions.generateImage(article.title)}
            className="w-full bg-success/10 text-success p-2 rounded-lg hover:bg-success/20 transition-all"
          >
            Crear imagen IA
          </button>
        </div>
      </div>
    </div>
  );
}