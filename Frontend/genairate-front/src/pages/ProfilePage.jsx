import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const profile = {
  name: "Agustín Paltrucci",
  username: "aguspaltrucci",
  bio: "Apasionado por la IA y la escritura creativa.",
  avatar: "/src/assets/profile1.jpg",
  banner: "/src/assets/blog5.jpg",
  location: "Buenos Aires",
  profession: "Escritor técnico",
  twitter: "https://twitter.com/aguspaltrucci",
  linkedin: "https://linkedin.com/in/aguspaltrucci",
  followers: 1200,
  following: 180,
  isCurrentUser: true, // mock: true if viewing own profile
};

const userStories = [
  { id: 1, title: "Cómo escribir mejor con IA", date: "2024-05-01", views: 300, cover: "/src/assets/blog1.jpg", type: "blog" },
  { id: 2, title: "Domina el estilo narrativo", date: "2024-04-20", views: 210, cover: "/src/assets/blog2.jpg", type: "tutorial" },
  { id: 3, title: "Guía para narradores", date: "2024-03-15", views: 150, cover: "/src/assets/blog3.jpg", type: "guide" },
];

const suggestions = [
  { name: "María López", avatar: "/src/assets/profile2.jpg", desc: "Autora de ciencia ficción", mutualFollowers: 5 },
  { name: "Julián Castro", avatar: "/src/assets/profile3.jpg", desc: "Narrador visual y guionista", mutualFollowers: 2 },
];

const testimonials = [
  { id: 1, author: "Laura Gómez", text: "Agustín es un escritor excepcional, siempre aporta ideas frescas." },
  { id: 2, author: "Carlos Méndez", text: "Colaborar con Agustín ha mejorado mi narrativa notablemente." },
];

export default function ProfilePage() {
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const filteredStories = useMemo(() => {
    let filtered = userStories;
    if (filterBy !== 'all') {
      filtered = filtered.filter(story => story.type === filterBy);
    }
    if (sortBy === 'views') {
      filtered = filtered.slice().sort((a, b) => b.views - a.views);
    } else {
      filtered = filtered.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return filtered;
  }, [sortBy, filterBy]);

  const totalViews = userStories.reduce((acc, story) => acc + story.views, 0);
  const lastPublication = userStories.reduce((latest, story) => {
    const d = new Date(story.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const shareProfile = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('URL copiada al portapapeles');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      {/* Banner */}
      <div className="relative h-48 rounded-lg overflow-hidden mb-6">
        <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-sm">@{profile.username}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-6 mb-6">
        <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-900" />
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📍 {profile.location} · 🧠 {profile.profession} ·{' '}
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">@{profile.username}</a>
          </p>
          <p className="mt-2">{profile.bio}</p>
          <div className="flex gap-6 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong>{profile.followers}</strong> seguidores</p>
            <p><strong>{profile.following}</strong> siguiendo</p>
          </div>
        </div>
        {profile.isCurrentUser && (
          <button className="ml-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            Editar perfil
          </button>
        )}
        <button onClick={shareProfile} className="ml-4 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Compartir mi perfil
        </button>
      </div>

      {/* Quick Stats */}
      <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <p>📝 {userStories.length} publicaciones</p>
        <p>👀 {totalViews} vistas totales</p>
        <p>📅 Última: {lastPublication.toLocaleDateString()}</p>
      </div>

      {/* Sort & Filter */}
      <div className="flex gap-4 mb-4">
        <select
          className="rounded border p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Ordenar publicaciones"
        >
          <option value="recent">Más recientes</option>
          <option value="views">Más vistas</option>
        </select>
        <select
          className="rounded border p-2"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          aria-label="Filtrar publicaciones"
        >
          <option value="all">Todos</option>
          <option value="blog">Blog</option>
          <option value="guide">Guía</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>

      {/* User Stories */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-lg hover:shadow transition flex gap-4 cursor-pointer"
            >
              <img src={story.cover} alt={story.title} className="w-24 h-16 object-cover rounded" />
              <div>
                <h3 className="font-medium">{story.title}</h3>
                <p className="text-xs text-gray-500">{story.date} · {story.views} vistas</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Recommendations */}
      <aside className="mt-10">
        <h3 className="text-md font-semibold mb-3">Recomendados para ti</h3>
        <div className="space-y-4">
          {suggestions.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
                <p className="text-xs text-gray-400">Seguidores en común: {s.mutualFollowers}</p>
              </div>
              <button className="text-xs border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100">Ver perfil</button>
            </div>
          ))}
        </div>
      </aside>

      {/* Testimonials */}
      <section className="mt-10">
        <h3 className="text-md font-semibold mb-3">Testimonios</h3>
        <div className="space-y-4">
          {testimonials.map(({ id, author, text }) => (
            <blockquote key={id} className="border-l-4 border-primary pl-4 italic text-gray-700 dark:text-gray-300">
              “{text}” — <span className="font-semibold">{author}</span>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
