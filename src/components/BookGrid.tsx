import { Link } from 'react-router-dom';
import { BookOpen, BookType } from 'lucide-react';
import { Book } from '../types';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
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
              <span className="font-semibold text-gray-900">${book.price}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}