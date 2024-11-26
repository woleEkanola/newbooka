import { useQuery } from '@tanstack/react-query';
import { Book as BookIcon, Download } from 'lucide-react';
import axios from 'axios';
import { Book } from '../types';
import { useAuth } from '../hooks/useAuth';

export default function Library() {
  const { user } = useAuth();
  
  const { data: books, isLoading } = useQuery({
    queryKey: ['purchased-books', user?.id],
    queryFn: async () => {
      const { data } = await axios.get<Book[]>('/api/user/purchased-books');
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Library</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 mb-4">By {book.author.name}</p>
              
              <div className="flex items-center justify-between">
                {book.isEbook && (
                  <button
                    className="flex items-center text-indigo-600 hover:text-indigo-700"
                    onClick={() => {/* Implement read logic */}}
                  >
                    <BookIcon className="h-5 w-5 mr-2" />
                    Read Now
                  </button>
                )}
                {book.isHardCopy && (
                  <button
                    className="flex items-center text-green-600 hover:text-green-700"
                    onClick={() => {/* Implement download logic */}}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}