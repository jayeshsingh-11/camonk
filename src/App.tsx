import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateBlog } from './components/CreateBlog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
