import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import fondoVideo from '../assets/fondo2.mp4';
import { getUserProfile } from '../services/authService';

const userStories = [
  { id: 1, title: 'Cómo escribir mejor con IA', date: '2024-05-01', views: 300, cover: '/src/assets/blog1.jpg', type: 'blog' },
  { id: 2, title: 'Domina el estilo narrativo', date: '2024-04-20', views: 210, cover: '/src/assets/blog2.jpg', type: 'tutorial' },
  { id: 3, title: 'Guía para narradores', date: '2024-03-15', views: 150, cover: '/src/assets/blog3.jpg', type: 'guide' }
];

const suggestions = [
  { name: 'María López', avatar: '/src/assets/profile2.jpg', desc: 'Autora de ciencia ficción', mutualFollowers: 5 },
  { name: 'Julián Castro', avatar: '/src/assets/profile3.jpg', desc: 'Narrador visual y guionista', mutualFollowers: 2 }
];

const testimonials = [
  { id: 1, author: 'Laura Gómez', text: 'Agustín es un escritor excepcional, siempre aporta ideas frescas.' },
  { id: 2, author: 'Carlos Méndez', text: 'Colaborar con Agustín ha mejorado mi narrativa notablemente.' }
];

export default function ProfilePage() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        // Map backend fields to frontend profile fields
        setProfile({
          name: data.username || '',
          username: data.username || '',
          bio: '', // no bio from backend
          avatar: '/src/assets/profile1.jpg', // placeholder avatar
          location: '', // no location from backend
          profession: '', // no profession from backend
          twitter: '', // no twitter from backend
          linkedin: '', // no linkedin from backend
          followers: 0, // no followers from backend
          following: 0, // no following from backend
          isCurrentUser: true
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const filteredStories = useMemo(() => {
    let filtered = userStories;
    if (filterBy !== 'all') {
      filtered = filtered.filter((story) => story.type === filterBy);
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
    alert(t('LinkCopied'));
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">{t('LoadingProfile')}...</div>;
  }

  if (!profile) {
    return <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">{t('ProfileNotFound')}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">

      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
        <video
          src={fondoVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full text-white z-10">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-sm">@{profile.username}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-900" />
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📍 {profile.location} · 🧠 {profile.profession} ·{' '}
            {profile.twitter ? (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">@{profile.username}</a>
            ) : (
              <span>@{profile.username}</span>
            )}
          </p>
          <p className="mt-2">{profile.bio}</p>
          <div className="flex gap-6 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <p><strong>{profile.followers}</strong> {t('Followers')}</p>
            <p><strong>{profile.following}</strong> {t('Following')}</p>
          </div>
        </div>
        {profile.isCurrentUser && (
          <button className="ml-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            {t('EditProfile')}
          </button>
        )}
        <button onClick={shareProfile} className="ml-4 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          {t('ShareProfile')}
        </button>
      </div>

      <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <p>📝 {userStories.length} {t('Posts')}</p>
        <p>👀 {totalViews} {t('TotalViews')}</p>
        <p>📅 {t('Last')}: {lastPublication.toLocaleDateString()}</p>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          className="rounded border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label={t('SortPosts')}
        >
          <option value="recent">{t('MostRecent')}</option>
          <option value="views">{t('MostViewed')}</option>
        </select>
        <select
          className="rounded border p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          aria-label={t('FilterPosts')}
        >
          <option value="all">{t('All')}</option>
          <option value="blog">{t('Blog')}</option>
          <option value="guide">{t('Guide')}</option>
          <option value="tutorial">{t('Tutorial')}</option>
        </select>
      </div>

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
                <p className="text-xs text-gray-500">{story.date} · {story.views} {t('Views')}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <aside className="mt-10">
        <h3 className="text-md font-semibold mb-3">{t('RecommendedForYou')}</h3>
        <div className="space-y-4">
          {suggestions.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
                <p className="text-xs text-gray-400">{t('MutualFollowers')}: {s.mutualFollowers}</p>
              </div>
              <button className="text-xs border border-gray-300 px-2 py-1 rounded-full hover:bg-gray-100">{t('ViewProfile')}</button>
            </div>
          ))}
        </div>
      </aside>

      <section className="mt-10">
        <h3 className="text-md font-semibold mb-3">{t('Testimonials')}</h3>
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
