import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Book } from '../types';

// Mock data for development
const mockBooks: Book[] = [
  {
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
  },
  {
    id: '2',
    title: 'Digital Photography Mastery',
    description: 'Learn the secrets of professional photography.',
    coverImage: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800',
    price: 24.99,
    author: {
      id: '2',
      name: 'Jane Smith',
      bio: 'Professional photographer and educator',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      coverImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600',
      publishedBooks: 2,
      followers: 800,
      joinedDate: '2023-02-15',
      books: [],
    },
    isEbook: true,
    isHardCopy: false,
    publishedDate: '2024-02-01',
  },
];

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      // In development, return mock data
      if (import.meta.env.DEV) {
        return mockBooks;
      }
      
      // In production, make the actual API call
      const { data } = await axios.get<Book[]>('/api/books');
      return data;
    },
    initialData: [], // Provide empty array as initial data
  });
}