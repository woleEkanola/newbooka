import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, BookType, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { Book } from '../types';
import { useAuth } from '../hooks/useAuth';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      if (!id) throw new Error('Book ID is required');
      
      // In development, return mock data
      if (import.meta.env.DEV) {
        return {
          id: '1',
          title: 'The Art of Programming',
          description: 'A comprehensive guide to modern programming practices.',
          coverImage: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800',
          price: 29.99,
          author: {
            id: '1',
            name: 'John Doe',
            bio: 'Experienced programmer and author',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1600',
            publishedBooks: 3,
            followers: 1200,
            joinedDate: '2023-01-01',
            books: [],
          },
          isEbook: true,
          isHardCopy: true,
          publishedDate: '2024-01-15',
        };
      }
      
      const { data } = await axios.get<Book>(`/api/books/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <p className="text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={book.author.avatar}
              alt={book.author.name}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {book.author.name}
              </p>
              <p className="text-sm text-gray-500">
                Published {new Date(book.publishedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-8">{book.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            {book.isEbook && (
              <span className="flex items-center text-indigo-600">
                <BookOpen className="h-5 w-5 mr-2" />
                E-Book Available
              </span>
            )}
            {book.isHardCopy && (
              <span className="flex items-center text-green-600">
                <BookType className="h-5 w-5 mr-2" />
                Hard Copy Available
              </span>
            )}
          </div>

          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                ${book.price}
              </p>
              <p className="text-sm text-gray-500">
                Includes all available formats
              </p>
            </div>
            <button
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={() => {/* Implement purchase logic */}}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}