
import React, { createContext, useContext, useState } from 'react';
import {
  generateArticle,
  rewriteText,
  summarizeText,
  translateText,
  correctText,
  saveArticle,
  getById,
  deleteArticle,
  getRecentArticles,
  getAllArticles,
  saveDraft,
  publishArticle
} from '../services/ContentService';

const EditorContext = createContext();

const mapToContentResponse = (article) => {
  if (!article) return null;

  return {
    id: article.id,
    title: article.title || '',
    introduction: article.sections?.[0]?.content || '',
    subtitle1: article.sections?.[1]?.heading || '',
    content1: article.sections?.[1]?.content || '',
    subtitle2: article.sections?.[2]?.heading || '',
    content2: article.sections?.[2]?.content || '',
    subtitle3: article.sections?.[3]?.heading || '',
    content3: article.sections?.[3]?.content || '',
    conclusion: article.sections?.[4]?.content || '',
    keywords: article.keywords ?? [],
    metaDescription: article.metaDescription || ''
  };
};

export const EditorProvider = ({ children }) => {
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // IA actions encapsuladas
  const aiActions = {
    rewriteText: async (input, tone = 'profesional') =>
      await rewriteText({ userInput: input, tone }),

    summarizeText: async (input) =>
      await summarizeText({ userInput: input }),

    translateText: async (input, language = 'en') =>
      await translateText({ userInput: input, language }),

    correctGrammar: async (input) =>
      await correctText({ userInput: input }),

    generateImage: async (title) =>
      alert(`🖼️ Generar imagen IA para: "${title}" (a implementar)`),

    exportAsPDF: () =>
      alert('📄 Exportación como PDF no implementada aún.'),

    exportAsMarkdown: () =>
      alert('📝 Exportación como Markdown no implementada aún.'),

    speechSynthesis: (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    },
  };

  // Generar artículo base
  const generateInitialArticle = async ({ userInput, tone = 'profesional', format = 'lista', language = 'es', templateId = 1 }) => {
  setLoading(true);
  setError(null);
  try {
    const response = await generateArticle({
      userInput,
      tone,
      format,
      language,
      templateId,
    });
    setCurrentArticle(response);
    return response;
  } catch (err) {
    setError(err);
    console.error('❌ Error generating article:', err);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const fetchArticleById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const article = await getById(id);
      setCurrentArticle(article);
      return article;
    } catch (err) {
      setError(err);
      console.error('❌ Error al cargar artículo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // New function to update the whole article
  const updateArticle = (updatedArticle) => {
    setCurrentArticle(updatedArticle);
  };

  // New function to update a section content by id
  const updateSectionContent = (sectionId, newContent) => {
    if (!currentArticle || !currentArticle.sections) return;
    const updatedSections = currentArticle.sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, content: newContent };
      }
      return section;
    });
    setCurrentArticle({ ...currentArticle, sections: updatedSections });
  };

  // Example handler to sync editor content with currentArticle sections
  const handleContentChange = (newContent) => {
    setEditorContent(newContent);
    if (currentArticle?.sections?.length > 0) {
      updateSectionContent(currentArticle.sections[0].id, newContent);
    }
  };

  const saveCurrentArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!currentArticle || !currentArticle.id) {
        throw new Error('Artículo inválido o sin ID');
      }
      const content = mapToContentResponse(currentArticle);
      if (!content) throw new Error('Artículo vacío o malformado');
      console.log('Artículo que se va a guardar:', content);
      await saveArticle(content);
    } catch (err) {
      setError(err);
      console.error('❌ Error al guardar artículo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentAsDraft = async (article) => {
    setLoading(true);
    setError(null);
    try {
      const content = mapToContentResponse(article);
      // Removed strict validation to allow saving incomplete drafts
      // if (!content.title || !content.introduction || !content.subtitle1) {
      //   throw new Error('❌ Contenido incompleto antes de guardar.');
      // }
      console.log("📤 Enviando artículo como draft:", content);
      await saveDraft(article.id, content);
    } catch (err) {
      setError(err);
      console.error('❌ Error al guardar como borrador:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const publishCurrentArticle = async (id) => {
    setLoading(true);
    setError(null);
    try {
      if (!currentArticle?.title?.trim() || !currentArticle?.conclusion?.trim()) {
        throw new Error("⚠️ Completa título y conclusión antes de publicar.");
      }
      await publishArticle(id);
    } catch (err) {
      setError(err);
      console.error('❌ Error al publicar artículo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const deleteArticleById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteArticle(id);
      setCurrentArticle(null);
    } catch (err) {
      setError(err);
      console.error('❌ Error al eliminar artículo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      return await getRecentArticles();
    } catch (err) {
      setError(err);
      console.error('❌ Error al cargar artículos recientes:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      return await getAllArticles();
    } catch (err) {
      setError(err);
      console.error('❌ Error al cargar todos los artículos:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setTitle = (newTitle) => {
    if (!currentArticle) return;
    setCurrentArticle({ ...currentArticle, title: newTitle });
  };

  return (
    <EditorContext.Provider
      value={{
        currentArticle,
        loading,
        error,
        aiActions,
        generateInitialArticle,
        fetchArticleById,
        saveCurrentArticle,
        saveCurrentAsDraft,
        publishCurrentArticle,
        deleteArticleById,
        fetchRecentArticles,
        fetchAllArticles,
        updateArticle,
        updateSectionContent,
        setTitle,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => useContext(EditorContext);


