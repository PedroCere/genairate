import { useEditor } from '../../context/EditorContext';
import React, { useState } from 'react';

export default function AISideBar() {
  const { aiActions, article, selectedText, activeSectionId } = useEditor();
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleTranslate = () => {
    if (selectedText) {
      aiActions.translateText(selectedText, targetLanguage);
    } else {
      alert('Por favor, selecciona un texto para traducir.');
    }
  };

  const handleSpeechSynthesis = () => {
    const currentSection = article.sections?.find(s => s.id === activeSectionId);
    if (currentSection) {
      aiActions.speechSynthesis(currentSection.content);
    } else {
      alert('No hay contenido para reproducir.');
    }
  };

  const handleExportPDF = () => {
    aiActions.exportAsPDF();
  };

  const handleExportMarkdown = () => {
    aiActions.exportAsMarkdown();
  };

  return (
    <div className="w-72 bg-surface-card border border-border rounded-xl p-6 space-y-6 text-text dark:text-text dark:bg-surface-card shadow-subtle">
      <h3 className="text-xl font-semibold">Asistente de IA</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted">Acciones rápidas</h4>
          <button
            onClick={() => aiActions.rewriteText(selectedText, article.tone)}
            className="w-full bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors"
          >
            Reescribir selección
          </button>
          <button
            onClick={aiActions.summarizeText}
            className="w-full bg-accent/10 text-accent p-2 rounded-lg hover:bg-accent/20 mt-3 transition-colors"
          >
            Resumir sección
          </button>
          <button
            onClick={aiActions.correctGrammar}
            className="w-full bg-warning/10 text-warning p-2 rounded-lg hover:bg-warning/20 mt-3 transition-colors"
          >
            Corregir gramática
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-muted">Traducción</h4>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full bg-white dark:bg-white text-dark dark:text-black px-3 py-1 rounded-lg mb-3 border border-border"
          >
            <option value="en">Inglés</option>
            <option value="es">Español</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
          </select>
          <button
            onClick={handleTranslate}
            className="w-full bg-info/10 text-info p-2 rounded-lg hover:bg-info/20 transition-colors"
          >
            Traducir selección
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-muted">Generar imagen</h4>
          <button
            onClick={() => aiActions.generateImage(article.title)}
            className="w-full bg-success/10 text-success p-2 rounded-lg hover:bg-success/20 transition-colors"
          >
            Crear imagen IA
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-muted">Texto a voz</h4>
          <button
            onClick={handleSpeechSynthesis}
            className="w-full bg-purple-600/10 text-purple-600 p-2 rounded-lg hover:bg-purple-600/20 transition-colors"
          >
            Reproducir sección
          </button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3 text-muted">Exportar</h4>
          <button
            onClick={handleExportPDF}
            className="w-full bg-gray-600/10 text-gray-600 p-2 rounded-lg hover:bg-gray-600/20 transition-colors mb-3"
          >
            Exportar como PDF
          </button>
          <button
            onClick={handleExportMarkdown}
            className="w-full bg-gray-600/10 text-gray-600 p-2 rounded-lg hover:bg-gray-600/20 transition-colors"
          >
            Exportar como Markdown
          </button>
        </div>
      </div>
    </div>
  );
}
