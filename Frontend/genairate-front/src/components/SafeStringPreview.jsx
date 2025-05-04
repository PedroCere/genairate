import React from 'react';
import { safeSlice } from '../utils/safeStringSlice';

/**
 * 
 * @param {object} props
 * @param {string} props.text 
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
