import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const mockArticle = {
  title: 'Cómo escribir mejor con IA',
  author: 'Agustín Paltrucci',
  date: '2024-05-01',
  content: `
  La inteligencia artificial ha transformado el proceso de escritura...
  
  ## ¿Por qué usar IA?
  Las herramientas de IA ofrecen soporte creativo, edición y más.

  ### Consejos prácticos:
  - Empezá con un prompt claro
  - Reescribí párrafos con IA para mejorar fluidez
  - Usá herramientas de resumen automático
  
  *Explorar estas técnicas puede hacer que escribas con más seguridad y estilo.*
  `,
  coverImage: '/src/assets/blog1.jpg',
  tags: ['IA', 'Escritura', 'Tecnología']
};

export default function ArticlePreviewPage() {
  const { t } = useTranslation();
  const { id } = useParams(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const article = mockArticle; 

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <img src={article.coverImage} alt={article.title} className="w-full rounded-lg mb-6 object-cover max-h-96" />

      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {article.author} · {new Date(article.date).toLocaleDateString()}
      </p>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {article.content.split('\n\n').map((para, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-sm text-blue-600">
        {article.tags.map(tag => (
          <span key={tag} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
}
