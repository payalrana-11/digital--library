import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Search from './components/Search';
import AllBooks from './components/AllBooks';
import Favorites from './components/Favorites';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import Footer from './components/Footer';
import { fetchPopularBooks } from './services/bookService';
import { Flame } from 'lucide-react';    //icons
import { Heart } from 'lucide-react';  

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [favorites, setFavorites] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bookverse_favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('bookverse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load popular books
  useEffect(() => {
    const loadData = async () => {
      const pop = await fetchPopularBooks();
      setPopularBooks(pop);
    };
    loadData();
  }, []);

  // Toggle Favorites
  const toggleFavorite = (book) => {
    const exists = favorites.some((b) => b.id === book.id);

    if (exists) {
      setFavorites(favorites.filter((b) => b.id !== book.id));
    } else {
      setFavorites([...favorites, book]);                 //spread operator
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isFavorite = (id) => favorites.some((b) => b.id === id);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    window.scrollTo(0, 0);
  };

  // Handle main view rendering
  const renderContent = () => {
    // Book Details View
    if (selectedBook) {
      return (
        <BookDetails
          book={selectedBook}
          onBack={() => setSelectedBook(null)}
          isFavorite={isFavorite(selectedBook.id)}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    // About Page
    if (currentView === 'about') {
      return <About onBack={() => setCurrentView('home')} />;
    }

    // Search Page
    if (currentView === 'search') {
      return (
        <Search
          onBack={() => setCurrentView('home')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onBookClick={handleBookClick}
        />
      );
    }

    // All Books Page
    if (currentView === 'all-books') {
      return (
        <AllBooks
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onBack={() => setCurrentView('home')}
          onBookClick={handleBookClick}
        />
      );
    }

    // HOME VIEW
    return (
      <main className="space-y-24">
        <Hero onDiscoverClick={() => setCurrentView('all-books')} />

        {/* Popular Books Section */}
        <section id="popular" className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="text-orange-500" />
              <h2 className="text-3xl font-bold text-white">Bestselling </h2>
            </div>
            <p className="text-gray-400">
              Trending books that everyone is talking about.
            </p>
          </div>

          {/* Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-6 px-4 sm:px-6 lg:px-8 pb-8 snap-x hide-scrollbar">
            {popularBooks.map((book) => (
              <div key={book.id} className="min-w-[200px] md:min-w-[240px] snap-center">
                <BookCard
                  book={book}
                  isFavorite={isFavorite(book.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={handleBookClick}
                  compact
                />
              </div>
            ))}
          </div>
        </section>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section
            id="favorites"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Heart className="text-orange-500" />
              <h2 className="text-3xl font-bold text-white">
                Your Favorites
              </h2>
              <div className="h-px bg-white/10 flex-grow ml-4"></div>
            </div>

            <Favorites
              books={favorites}
              onToggleFavorite={toggleFavorite}
              onBookClick={handleBookClick}
            />
          </section>
        )}
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950/20 text-white font-sans selection:bg-indigo-500/30">
      <Navbar
        currentView={currentView}
        onChangeView={(view) => {
          setCurrentView(view);
          setSelectedBook(null);
        }}
        onScrollToSection={scrollToSection}
      />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;
