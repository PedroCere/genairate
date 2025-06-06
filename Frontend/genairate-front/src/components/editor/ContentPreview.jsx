import { useEditor } from '../../context/EditorContext';
import { safeSlice } from '../../utils/safeStringSlice';
import { safeString } from '../../utils/safeString';

export default function ContentPreview() {
  const { article } = useEditor();

  return (
    <div className="bg-background p-4 rounded-xl h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-text mb-6">{safeString(article?.title)}</h2>
      
      {article?.sections?.map((section, index) => (
        <div key={section.id} className="mb-6">
          {section.heading && (
            <h3 className="text-xl font-semibold text-text mb-2">
              {safeString(section.heading)}
            </h3>
          )}
          <p className="text-secondary leading-relaxed">
            {safeSlice(safeString(section.content), 0, 100)}
          </p>
        </div>
      ))}
    </div>
  );
}
