import { Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Users, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import DashboardHome from '../components/dashboard/DashboardHome';
import PublishedBooks from '../components/dashboard/PublishedBooks';
import Analytics from '../components/dashboard/Analytics';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen className="h-5 w-5 text-gray-600" />
              <span>Overview</span>
            </Link>
            <Link
              to="/dashboard/books"
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Users className="h-5 w-5 text-gray-600" />
              <span>Published Books</span>
            </Link>
            <Link
              to="/dashboard/analytics"
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Analytics</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-md p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="books" element={<PublishedBooks />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}