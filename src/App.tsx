import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuthorProfile from './pages/AuthorProfile';
import BookDetails from './pages/BookDetails';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import ReaderLayout from './layouts/ReaderLayout';
import Library from './pages/Library';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/author/:id" element={<AuthorProfile />} />
            <Route path="/book/:id" element={<BookDetails />} />
            
            <Route element={<AuthLayout />}>
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Route>
            
            <Route element={<ReaderLayout />}>
              <Route path="/library" element={<Library />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;