import { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { contentService, aiService } from '../services';

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [article, setArticle] = useState({
    id: null,
    title: '',
    sections: [{ id: uuidv4(), heading: '', content: '' }],
    tone: 'profesional',
    language: 'es',
    format: 'blog',
    status: 'draft',
    aiSuggestions: [],
    images: [],
    lastSaved: null,
    isLoading: false
  });

  const [activeSectionId, setActiveSectionId] = useState(article.sections[0].id);
  const [selectedText, setSelectedText] = useState('');

  const updateArticle = useCallback((updates) => {
    setArticle(prev => ({
      ...prev,
      ...updates,
      lastSaved: new Date().toISOString()
    }));
  }, []);

  const setTitle = useCallback((title) => {
    updateArticle({ title });
  }, [updateArticle]);

  const updateSectionContent = useCallback((sectionId, content) => {
    setArticle(prev => ({
      ...prev,
      sections: prev.sections.map(section => 
        section.id === sectionId ? { ...section, content } : section
      )
    }));
  }, []);

  const addSection = useCallback((type = 'text') => {
    const newSection = {
      id: uuidv4(),
      heading: '',
      content: type === 'image' ? '' : ''
    };
    
    setArticle(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setActiveSectionId(newSection.id);
  }, []);

  const generateInitialArticle = useCallback(async (topic) => {
    try {
      updateArticle({ isLoading: true });
      const generatedContent = await contentService.generateArticle({
        topic,
        tone: article.tone,
        language: article.language
      });
      
      setArticle(prev => ({
        ...prev,
        title: generatedContent.title,
        sections: generatedContent.sections,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error generating article:', error);
      updateArticle({ isLoading: false });
    }
  }, [article.tone, article.language, updateArticle]);

  const rewriteText = useCallback(async (text, tone) => {
    try {
      updateArticle({ isLoading: true });
      const rewritten = await contentService.rewriteText(text, tone);
      
      // Reemplazar el texto seleccionado
      updateSectionContent(activeSectionId, 
        article.sections.find(s => s.id === activeSectionId).content
          .replace(selectedText, rewritten)
      );
    } finally {
      updateArticle({ isLoading: false });
    }
  }, [activeSectionId, selectedText, article.sections, updateArticle, updateSectionContent]);

  const aiActions = {
    summarizeText: useCallback(async () => {
      const content = article.sections.find(s => s.id === activeSectionId).content;
      return await contentService.summarizeText(content);
    }, [activeSectionId, article.sections]),
    
    correctGrammar: useCallback(async () => {
      const content = article.sections.find(s => s.id === activeSectionId).content;
      return await contentService.correctText(content);
    }, [activeSectionId, article.sections]),
    
    generateImage: useCallback(async (prompt) => {
      const imageUrl = await aiService.generateImage(prompt);
      setArticle(prev => ({
        ...prev,
        images: [...prev.images, { url: imageUrl, prompt }]
      }));
      return imageUrl;
    }, [])
  };

  const value = {
    article,
    activeSectionId,
    selectedText,
    setTitle,
    updateSectionContent,
    addSection,
    setActiveSectionId,
    setSelectedText,
    generateInitialArticle,
    rewriteText,
    aiActions,
    saveDraft: useCallback(async () => {
      await contentService.saveDraft(article.id, article);
    }, [article]),
    publishArticle: useCallback(async () => {
      await contentService.publishArticle(article.id);
      updateArticle({ status: 'published' });
    }, [article.id, updateArticle])
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};