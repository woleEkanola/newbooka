import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Book } from '../../types';
import BookGrid from '../BookGrid';

export default function PublishedBooks() {
  const { data: books, isLoading } = useQuery({
    queryKey: ['author-books'],
    queryFn: async () => {
      const { data } = await axios.get<Book[]>('/api/author/books');
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Books</h2>
      {books && <BookGrid books={books} />}
    </div>
  );
}