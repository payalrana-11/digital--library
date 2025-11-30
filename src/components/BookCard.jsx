import React from 'react';
import { Heart, Star, BookOpen } from 'lucide-react';

const BookCard = ({ book, isFavorite, onToggleFavorite, onClick, compact = false }) => {
  const { title, authors, imageLinks, averageRating, previewLink } = book.volumeInfo;

  const thumbnail =
    imageLinks?.thumbnail?.replace('http:', 'https:') ||
    'https://picsum.photos/128/192';

  return (
    <div
      onClick={() => onClick(book)}
      className="group relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 
      hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
      hover:shadow-indigo-500/20 flex flex-col h-full cursor-pointer"
    >

      {/* Image Container */}
      <div
        className={`relative w-full overflow-hidden ${compact ? 'h-48' : 'h-64'} bg-gray-900`}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 
          group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100" />

        {/* Rating Badge */}
        {averageRating && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm 
          px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-yellow-400 
          border border-white/10"
          >
            <Star size={12} fill="currentColor" />
            <span>{averageRating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-bold text-white leading-tight mb-1 line-clamp-1"
          title={title}
        >
          {title}
        </h3>

        <p className="text-sm text-gray-400 mb-3 line-clamp-1">
          {authors ? authors.join(', ') : 'Unknown Author'}
        </p>

        <div className="mt-auto flex gap-2">

          {/* Read Button */}
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 
            text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
          >
            <BookOpen size={16} />
            {compact ? 'Read' : 'Read Now'}
          </a>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(book);
            }}
            className={`p-2 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-pink-500/20 border-pink-500 text-pink-500 hover:bg-pink-500/30'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
