import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import EmptyState from '../components/EmptyState';
import ArticleTabs from '../components/ArticleTabs';
import Modal from '../components/common/modals/Modal';
import GenerateBlogModal from '../components/common/modals/GenerateBlogModal';
import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.jpg';
import blog3 from '../assets/blog3.jpg';
import blog4 from '../assets/blog4.jpg';
import blog5 from '../assets/blog5.jpg';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';
import profile4 from '../assets/profile4.jpg';
import profile5 from '../assets/profile5.jpg';
import profile6 from '../assets/profile6.jpg';

const tabs = ["For you", "Following", "Featured", "Productivity", "Technology", "Programming"];

const articles = [
  {
    id: 1,
    title: "How AI is Transforming Content Creation",
    description: "Explore how generative models like ChatGPT are changing how we write, market, and brainstorm.",
    author: "Ana Torres",
    authorImage: profile1,
    image: blog1,
    date: "2024-05-05",
    views: 845,
    comments: 14,
    tab: "Technology",
  },
  {
    id: 2,
    title: "Breaking Free from Procrastination",
    description: "A psychological approach to developing better writing habits in digital environments.",
    author: "Luis Peña",
    authorImage: profile3,
    image: blog2,
    date: "2024-04-29",
    views: 1520,
    comments: 23,
    tab: "Productivity",
  },
  {
    id: 3,
    title: "Featured: The Future of Programming",
    description: "Insights into the evolving landscape of programming languages and tools.",
    author: "Marta Gómez",
    authorImage: profile4,
    image: blog3,
    date: "2024-05-01",
    views: 980,
    comments: 19,
    tab: "Featured",
  },
  {
    id: 4,
    title: "Top Productivity Hacks for Developers",
    description: "Maximize your coding efficiency with these proven techniques.",
    author: "Carlos Ruiz",
    authorImage: profile6,
    image: blog4,
    date: "2024-04-25",
    views: 1340,
    comments: 27,
    tab: "Productivity",
  },
  {
    id: 5,
    title: "Programming Paradigms Explained",
    description: "A deep dive into different programming paradigms and their use cases.",
    author: "Elena Martínez",
    authorImage: profile5,
    image: blog5,
    date: "2024-05-03",
    views: 1120,
    comments: 21,
    tab: "Programming",
  },
];

const highlights = [
  {
    title: 'Cómo destacar en contenido web este mes',
    author: 'Comunidad GenAirate',
    date: '3/5/2024',
  },
  {
    title: 'Técnicas de escritura más leídas',
    author: 'Laura P.',
    date: '30/4/2024',
  },
];

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("For you");
  const [showOptions, setShowOptions] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 relative text-gray-900 dark:text-gray-100">
      <div>
        <ArticleTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {articles.filter(article => activeTab === "For you" || article.tab === activeTab).length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {articles
              .filter(article => activeTab === "For you" || article.tab === activeTab)
              .map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        )}
      </div>

      <aside className="hidden lg:block space-y-10">
        <section>
          <h3 className="text-xl font-bold mb-4">{t("CommunityBlogs")}</h3>
          <div className="space-y-4">
            {highlights.map((item, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.author} • {item.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">Recommended topics</h4>
          <div className="flex flex-wrap gap-2">
            {["Data Science", "Self Improvement", "Politics", "Writing", "Relationships", "Cryptocurrency", "Machine Learning"].map((topic) => (
              <span key={topic} className="bg-gray-100 dark:bg-gray-700 text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                {topic}
              </span>
            ))}
          </div>
          <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">See more topics</button>
        </section>

        <section>
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">Who to follow</h4>
          <div className="space-y-4 text-sm">
            {[ 
              { name: "Dr. Ashish Bamania", desc: "I simplify the latest advances in AI, Quantum...", avatar: profile1 },
              { name: "Predict", desc: "Where the future is written", avatar: profile2 },
              { name: "Muneeb Sikhani", desc: "MOON", avatar: profile3 },
            ].map((user, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.desc}</p>
                </div>
                <button className="text-xs border border-gray-400 dark:border-gray-600 rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium">
                  Follow
                </button>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline">See more suggestions</button>
        </section>

        <section className="text-xs mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <h4 className="font-semibold mb-2">Reading list</h4>
          <p>
            Click the <span className="border px-1 rounded text-xs font-mono">🔖</span> on any story to easily add it to your reading list or a custom list that you can share.
          </p>
          <div className="mt-4 text-[10px] flex flex-wrap gap-3">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Status</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Rules</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Text to speech</a>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-5 shadow-md">
          <h4 className="font-semibold mb-3">{t("WriteInGenAirate")}</h4>
          <ul className="text-sm space-y-1">
            <li>✍️ {t("NewWritersGuide")}</li>
            <li>✍️ {t("WritingTips")}</li>
            <li>✍️ {t("ExpandAudience")}</li>
          </ul>
          <button className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-300 transition text-sm">
            {t("StartWriting")}
          </button>
        </section>
      </aside>
    </div>
  );
}
