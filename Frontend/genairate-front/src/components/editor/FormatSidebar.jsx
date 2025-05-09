import {
  Bold, Italic, Heading1, Heading2, Text,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Strikethrough, Underline, Quote, Code2, Eraser
} from 'lucide-react';

export default function FormatSidebar({ editor }) {
  const applyFormat = (command) => {
    const instance = editor?.current?.instance;
    if (!instance) return;
    command(instance);
  };

  const btnClass = "flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  return (
    <div className="p-4 bg-surface-card rounded-xl shadow-subtle text-sm space-y-4">
      <h4 className="text-lg font-semibold flex items-center gap-2">🛠 Formato</h4>

      {/* Texto básico */}
      <div className="space-y-2">
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleBold().run())}><Bold size={16}/> Negrita</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleItalic().run())}><Italic size={16}/> Cursiva</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleUnderline?.().run())}><Underline size={16}/> Subrayado</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleStrike().run())}><Strikethrough size={16}/> Tachado</button>
      </div>

      {/* Encabezados */}
      <div className="space-y-2 border-t pt-4">
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setHeading({ level: 1 }).run())}><Heading1 size={16}/> Título (H1)</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setHeading({ level: 2 }).run())}><Heading2 size={16}/> Subtítulo (H2)</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setParagraph().run())}><Text size={16}/> Párrafo</button>
      </div>

      {/* Listas */}
      <div className="space-y-2 border-t pt-4">
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleBulletList().run())}><List size={16}/> Lista</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleOrderedList().run())}><ListOrdered size={16}/> Lista ordenada</button>
      </div>

      {/* Alineación */}
      <div className="space-y-2 border-t pt-4">
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setTextAlign('left').run())}><AlignLeft size={16}/> Alinear izquierda</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setTextAlign('center').run())}><AlignCenter size={16}/> Centrar</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().setTextAlign('right').run())}><AlignRight size={16}/> Alinear derecha</button>
      </div>

      {/* Otros */}
      <div className="space-y-2 border-t pt-4">
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleBlockquote().run())}><Quote size={16}/> Cita</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().toggleCodeBlock().run())}><Code2 size={16}/> Código</button>
        <button className={btnClass} onClick={() => applyFormat(e => e.chain().focus().unsetAllMarks().clearNodes().run())}><Eraser size={16}/> Limpiar formato</button>
      </div>
    </div>
  );
}
