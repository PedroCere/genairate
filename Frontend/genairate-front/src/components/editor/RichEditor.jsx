import { useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export default function RichEditor({ value = initialValue, onChange }) {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={onChange}
    >
      <Editable
        className="p-4 text-text focus:outline-none min-h-[500px]"
        placeholder="Escribe tu contenido aquí..."
      />
    </Slate>
  );
}
