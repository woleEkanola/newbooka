export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  coverImage: string;
  publishedBooks: number;
  followers: number;
  joinedDate: string;
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  author: Author;
  isEbook: boolean;
  isHardCopy: boolean;
  publishedDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'reader' | 'author' | 'admin';
}