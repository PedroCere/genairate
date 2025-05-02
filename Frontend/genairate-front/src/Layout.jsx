import Navbar from './components/NavBar';
import Sidebar from './components/SideBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#1E293B] text-white relative overflow-visible">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 px-4 py-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
