import React, { useEffect, useState } from 'react';
import { getImagesByKeyword } from '../services/UnsplashService';

const ImageSuggestions = ({ keywords = [] }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const fetched = await Promise.all(
        keywords.slice(0, 6).map(async (kw) => {
          try {
            const url = await getImagesByKeyword(kw);
            return { keyword: kw, url };
          } catch {
            return { keyword: kw, url: null };
          }
        })
      );
      setImages(fetched);
    };
    fetchImages();
  }, [keywords]);

  if (!images.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-text">📸 Imágenes sugeridas según el contenido</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(({ keyword, url }, index) => (
          <div key={index} className="rounded overflow-hidden shadow-md">
            {url ? (
              <img
                src={url}
                alt={`Imagen relacionada a ${keyword}`}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm">
                No se encontró imagen para "{keyword}"
              </div>
            )}
            <div className="p-2 bg-surface-card text-sm text-muted text-center">
              {keyword}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSuggestions;

