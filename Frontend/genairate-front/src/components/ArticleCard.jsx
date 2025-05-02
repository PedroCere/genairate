import { motion } from 'framer-motion';

export default function ArticleCard({ article, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#2C3A50] rounded-xl p-4 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text mb-2">{article.title}</h3>
          <div className="flex items-center space-x-2 text-secondary">
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.wordCount} palabras</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          article.tone === 'Profesional' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-accent/10 text-accent'
        }`}>
          {article.tone}
        </span>
      </div>
    </motion.div>
  );
}