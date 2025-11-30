import React, { useState, useEffect } from 'react';
import { fetchBooksByCategory } from '../services/bookService';
import BookCard from './BookCard';
import { Loader2, ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  'Fiction', 'Romance', 'Mystery', 'History', 'Science', 'Fantasy', 'Horror', 'Technology'
];

const AllBooks = ({ favorites, onToggleFavorite, onBack, onBookClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const fetchedBooks = await fetchBooksByCategory(selectedCategory);
      setBooks(fetchedBooks);
      setLoading(false);
    };

    loadBooks();
  }, [selectedCategory]);

  const isFavorite = (id) => favorites.some((b) => b.id === id);

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Explore Our Collection</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Grid */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isFavorite={isFavorite(book.id)}
                    onToggleFavorite={onToggleFavorite}
                    onClick={onBookClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
