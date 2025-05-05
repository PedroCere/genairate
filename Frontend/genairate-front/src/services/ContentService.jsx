// services/contentService.js

// Simulador de delay para peticiones
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Datos mockeados
const demoArticles = [
  {
    id: '1',
    title: 'Cómo escribir contenido efectivo con IA',
    sections: [
      {
        id: 'section-1',
        heading: 'Introducción',
        content: 'La inteligencia artificial está revolucionando la creación de contenido...'
      },
      {
        id: 'section-2',
        heading: 'Mejores prácticas',
        content: '1. Define tu tono y estilo desde el inicio\n2. Usa keywords relevantes...'
      }
    ],
    tone: 'profesional',
    language: 'es',
    status: 'published',
    wordCount: 850,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-05T15:30:00Z'
  },
  {
    id: '2',
    title: 'Guía completa de SEO para blogs',
    sections: [
      {
        id: 'section-1',
        heading: 'Fundamentos SEO',
        content: 'El SEO es esencial para mejorar la visibilidad de tus contenidos...'
      }
    ],
    tone: 'seo',
    language: 'es',
    status: 'draft',
    wordCount: 450,
    createdAt: '2024-05-10T14:20:00Z',
    updatedAt: '2024-05-10T14:20:00Z'
  }
];

export const getById = async (id) => {
  await simulateDelay();
  const article = demoArticles.find(a => a.id === id);
  
  if (!article) {
    throw new Error('Artículo no encontrado');
  }
  
  return {
    ...article,
    sections: article.sections.map(section => ({
      ...section,
      content: section.content
    }))
  };
};

export const getRecentArticles = async (userId) => {
  await simulateDelay();
  return demoArticles.slice(0, 3).map(article => ({
    id: article.id,
    title: article.title,
    date: article.updatedAt,
    wordCount: article.wordCount,
    tone: article.tone,
    status: article.status
  }));
};

// Implementación mockeada completa
export const contentService = {
  generateArticle: async (data) => {
    await simulateDelay();
    return {
      id: `demo-${Date.now()}`,
      title: data.topic || 'Artículo generado por IA',
      sections: [
        {
          id: 'section-1',
          heading: 'Introducción',
          content: `Este es un contenido generado automáticamente sobre ${data.topic}. La IA ha creado...`
        },
        {
          id: 'section-2',
          heading: 'Desarrollo',
          content: 'Aquí encontrarás los puntos clave desarrollados por nuestra inteligencia artificial...'
        }
      ],
      tone: data.tone || 'profesional',
      language: data.language || 'es',
      status: 'draft',
      wordCount: 600,
      createdAt: new Date().toISOString()
    };
  },

  rewriteText: async (text, tone) => {
    await simulateDelay();
    const tones = {
      profesional: `Desde una perspectiva profesional: ${text}`,
      creativo: `¡Imagina esto! ${text}...`,
      seo: `${text}. Este contenido optimizado para SEO incluye keywords relevantes.`
    };
    return tones[tone] || text;
  },

  saveDraft: async (id, content) => {
    await simulateDelay();
    console.log('Draft guardado (mock):', { id, content });
    return { success: true, message: 'Borrador guardado exitosamente' };
  },

  summarizeText: async (text) => {
    await simulateDelay();
    return `${text.substring(0, 150)}... [Resumen generado por IA]`;
  },

  correctText: async (text) => {
    await simulateDelay();
    return text.replace(/(\s+)/g, ' ') + ' [Texto corregido]';
  },

  translateText: async (text, lang) => {
    await simulateDelay();
    return `[Traducido al ${lang}]: ${text}`;
  },

  generateImage: async (prompt) => {
    await simulateDelay();
    return `https://placehold.co/600x400/1e293b/06b6d4?text=${encodeURIComponent(prompt)}`;
  },

  getAnalytics: async () => {
    await simulateDelay();
    return {
      totalWords: 2450,
      avgWords: 810,
      toneDistribution: { profesional: 60, seo: 30, creativo: 10 },
      weeklyProgress: [400, 650, 800, 1200, 1800, 2100, 2450]
    };
  }
};

// Helper para desarrollo
window.mockContentService = contentService;