import { useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default function RichEditor({ value, onChange }) {
  const [editor] = useState(() => withHistory(withReact(createEditor()))); // Paréntesis adicional aquí

  return (
    <Slate
      editor={editor}
      value={value || initialValue}
      onChange={onChange}
    >
      <Editable
        className="p-4 text-text focus:outline-none min-h-[500px]"
        placeholder="Escribe tu contenido aquí..."
      />
    </Slate>
  );
}