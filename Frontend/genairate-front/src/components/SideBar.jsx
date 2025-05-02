import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEditor } from '../context/EditorContext';

export default function Sidebar() {
  const [isStyleOpen, setIsStyleOpen] = useState(true);
  const { tone, updateTone } = useEditor();

  const menuItems = [
    { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '/' },
    { name: 'Editor', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', path: '/editor' },
    { name: 'Analíticas', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', path: '/analytics' },
    { name: 'Historial', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: '/history' },
    { name: 'Plantillas', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', path: '/templates' }
  ];

  return (
    <aside className="w-56 bg-[#1E293B] border-r border-[#334155] h-screen flex flex-col">
      <div className="p-4 pb-2">
        <h2 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-[#06B6D4]">Gen</span>
          <span className="text-[#C084FC]">Airate</span>
        </h2>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-1.5 rounded-md transition-all duration-150 group
                ${isActive ? 'bg-[#06B6D4]/15 text-white' : 'hover:bg-[#2C3A50]/60 text-[#94A3B8]'}`
              }
            >
              <svg 
                className="w-3.5 h-3.5 mr-2 text-[#94A3B8] group-hover:text-[#C084FC]"
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="text-[13px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-[#334155]/50 p-4 pt-2">
        <button 
          className="flex items-center justify-between w-full mb-1.5 hover:bg-[#2C3A50]/30 rounded-md p-1 transition-colors"
          onClick={() => setIsStyleOpen(!isStyleOpen)}
        >
          <h3 className="text-[11px] font-medium text-[#94A3B8] tracking-wide uppercase">Estilo</h3>
          <svg
            className={`w-3 h-3 text-[#94A3B8] transform transition-transform ${isStyleOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isStyleOpen && (
          <div className="space-y-1">
            <button
              onClick={() => updateTone('profesional')}
              className={`w-full flex items-center p-1 rounded-md transition-colors text-[13px]
                ${tone === 'profesional' 
                  ? 'bg-[#06B6D4]/15 text-[#06B6D4]' 
                  : 'hover:bg-[#2C3A50]/50 text-[#94A3B8]'}`
              }
            >
              <span className="w-4 mr-1 text-[0.9em]">⚡</span>
              <span>Profesional</span>
            </button>
            {/* Repetir para otro botón */}
          </div>
        )}
      </div>
    </aside>
  );
}