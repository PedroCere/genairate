import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, forwardRef, useImperativeHandle } from 'react';
import './editor.css';

const TipTapEditor = forwardRef(({ content, onUpdate }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    editorProps: {
      attributes: {
        class: 'max-w-none w-full min-h-[65vh] p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) onUpdate(editor.getHTML());
    },
  });

  useImperativeHandle(ref, () => ({
    get instance() {
      return editor;
    },
  }));

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
});

export default TipTapEditor;
