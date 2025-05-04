import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export default function TipTapEditor({ content, onUpdate }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getJSON());
      }
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 text-text min-h-[500px] border rounded">
      <EditorContent editor={editor} />
    </div>
  );
}
