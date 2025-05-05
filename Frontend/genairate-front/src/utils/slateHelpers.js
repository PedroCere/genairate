import { Node } from 'slate';

function sanitizeTextNodes(nodes) {
  return nodes.map(node => {
    if (node.children) {
      return {
        ...node,
        children: sanitizeTextNodes(node.children),
      };
    }
    return {
      ...node,
      text: typeof node.text === 'string' ? node.text : '',
    };
  });
}

export const serializeContent = (value) => {
  return value.map(n => Node.string(n)).join('\n');
};

export const deserializeContent = (contentString) => {
  if (typeof contentString !== 'string' || contentString.trim() === '') {
    console.warn("Empty or invalid content string, falling back to empty slate value");
    return [{
      type: 'paragraph',
      children: [{ text: '' }]
    }];
  }
  try {
    const parsed = JSON.parse(contentString);
    if (Array.isArray(parsed)) {
      return sanitizeTextNodes(parsed);
    }
  } catch (e) {
    console.warn("Error parsing content, falling back to empty slate value");
  }

  return [{
    type: 'paragraph',
    children: [{ text: '' }]
  }];
};

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
