// services/unsplashService.js
const UNSPLASH_ACCESS_KEY = ''; // <-- ponelo en .env si querés

export const getImagesByKeyword = async (keyword) => {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`);
  if (!res.ok) throw new Error("Error fetching images");
  const data = await res.json();
  return data.results[0]?.urls?.regular || '';
};
