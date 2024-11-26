import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, BookType } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: books = [], isLoading } = useBooks();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Books
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find your next favorite read from our collection of talented authors
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title, author, or genre..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading books...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No books found matching your search.</p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 mb-4">{book.author.name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {book.isEbook && (
                      <span className="flex items-center text-indigo-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        E-Book
                      </span>
                    )}
                    {book.isHardCopy && (
                      <span className="flex items-center text-green-600">
                        <BookType className="h-4 w-4 mr-1" />
                        Hard Copy
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${book.price}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}