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
          <button
            onClick={aiActions.correctGrammar}
            className="w-full bg-warning/10 text-warning p-2 rounded-lg hover:bg-warning/20 mt-2 transition-all"
          >
            Corregir gramática
          </button>
        </div>

        <div className="bg-[#2C3A50] p-4 rounded-xl">
          <h4 className="text-sm font-medium text-secondary mb-2">Traducción</h4>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full bg-background text-text px-3 py-1 rounded-lg mb-2"
          >
            <option value="en">Inglés</option>
            <option value="es">Español</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
          </select>
          <button
            onClick={handleTranslate}
            className="w-full bg-info/10 text-info p-2 rounded-lg hover:bg-info/20 transition-all"
          >
            Traducir selección
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

        <div className="bg-[#2C3A50] p-4 rounded-xl">
          <h4 className="text-sm font-medium text-secondary mb-2">Texto a voz</h4>
          <button
            onClick={handleSpeechSynthesis}
            className="w-full bg-purple-600/10 text-purple-600 p-2 rounded-lg hover:bg-purple-600/20 transition-all"
          >
            Reproducir sección
          </button>
        </div>

        <div className="bg-[#2C3A50] p-4 rounded-xl">
          <h4 className="text-sm font-medium text-secondary mb-2">Exportar</h4>
          <button
            onClick={handleExportPDF}
            className="w-full bg-gray-600/10 text-gray-600 p-2 rounded-lg hover:bg-gray-600/20 transition-all mb-2"
          >
            Exportar como PDF
          </button>
          <button
            onClick={handleExportMarkdown}
            className="w-full bg-gray-600/10 text-gray-600 p-2 rounded-lg hover:bg-gray-600/20 transition-all"
          >
            Exportar como Markdown
          </button>
        </div>
      </div>
    </div>
  );
}
