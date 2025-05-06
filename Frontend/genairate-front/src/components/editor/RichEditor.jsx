import { useState, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default function RichEditor({ value, onChange }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const safeValue = Array.isArray(value) ? value : initialValue;

  return (
    <Slate editor={editor} value={safeValue} onChange={onChange || (() => {})}>
      <Editable
        className="p-4 text-text bg-surface-card rounded-xl shadow-subtle focus:outline-none min-h-[500px]"
        placeholder="Escribe tu contenido aquí..."
      />
    </Slate>
  );
}
