import { Node } from 'slate';

// Convertir contenido de Slate a texto plano
export const serializeContent = (value) => {
  return value.map(n => Node.string(n)).join('\n');
};

// Convertir texto plano a formato Slate
export const deserializeContent = (text) => {
  return text.split('\n').map(line => ({
    type: 'paragraph',
    children: [{ text: line }],
  }));
};

// Funciones de ayuda para formato
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  
  if (isActive) {
    editor.removeMark(format);
  } else {
    editor.addMark(format, true);
  }
};

export const isMarkActive = (editor, format) => {
  const marks = editor.getMarks();
  return marks ? marks[format] === true : false;
};

export const withInlines = (editor) => {
  const { isInline } = editor;

  editor.isInline = element => 
    ['link', 'image'].includes(element.type) || isInline(element);

  return editor;
};