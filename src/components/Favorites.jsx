import React from 'react';
import BookCard from './BookCard';
import { HeartCrack } from 'lucide-react';

const Favorites = ({ books, onToggleFavorite, onBookClick }) => {
  if (books.length === 0) {
    return (
      <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center">
        <HeartCrack className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h3>
        <p className="text-gray-400">Start exploring and add books to your collection!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
          onClick={onBookClick}
          compact={true}
        />
      ))}
    </div>
  );
};

export default Favorites;
