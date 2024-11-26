import { useQuery } from '@tanstack/react-query';
import { Book, DollarSign, Users } from 'lucide-react';
import axios from 'axios';

export default function DashboardHome() {
  const { data: stats } = useQuery({
    queryKey: ['author-stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/author/stats');
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Published Books</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.publishedBooks || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats?.totalSales || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Readers</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalReaders || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}