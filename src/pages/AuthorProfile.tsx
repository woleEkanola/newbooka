import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Users, Calendar } from 'lucide-react';
import axios from 'axios';
import BookGrid from '../components/BookGrid';
import { Author } from '../types';

export default function AuthorProfile() {
  const { id } = useParams();
  const { data: author, isLoading } = useQuery({
    queryKey: ['author', id],
    queryFn: async () => {
      const { data } = await axios.get<Author>(`/api/authors/${id}`);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!author) return <div>Author not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-indigo-600">
          <img
            src={author.coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="relative -mt-16 px-6">
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-32 w-32 rounded-full border-4 border-white object-cover"
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
              <div className="mt-2 flex items-center text-gray-600 space-x-6">
                <span className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {author.publishedBooks} Books
                </span>
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {author.followers} Followers
                </span>
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Joined {new Date(author.joinedDate).getFullYear()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-600 whitespace-pre-line">{author.bio}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Books</h2>
        <BookGrid books={author.books} />
      </div>
    </div>
  );
}