import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Analytics() {
  const { data: analytics } = useQuery({
    queryKey: ['author-analytics'],
    queryFn: async () => {
      const { data } = await axios.get('/api/author/analytics');
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          {/* Add charts/graphs here */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Reader Demographics</h3>
          {/* Add demographic data visualization */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Reading Analytics</h3>
          {/* Add reading statistics */}
        </div>
      </div>
    </div>
  );
}