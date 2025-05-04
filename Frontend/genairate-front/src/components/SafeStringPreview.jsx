import React from 'react';
import { safeSlice } from '../utils/safeStringSlice';

/**
 * Example component that safely slices a text prop to preview.
 * 
 * @param {object} props
 * @param {string} props.text - The text to preview.
 */
const SafeStringPreview = (props) => {
  const preview = safeSlice(props.text, 0, 100);

  return (
    <div>
      <p>{preview}</p>
    </div>
  );
};

export default SafeStringPreview;
