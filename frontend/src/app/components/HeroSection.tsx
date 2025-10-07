"use client";
import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api/movies';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroMovie() {
      try {
        const movies = await fetchTrendingMovies();
        if (movies && movies.length > 0) {
          setHeroMovie(movies[0]);
        }
      } catch (error) {
        console.error('Failed to load hero movie:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHeroMovie();
  }, []);

  if (loading) {
    return (
      <div className={`w-full h-96 bg-gray-800 animate-pulse ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!heroMovie) {
    return (
      <div className={`w-full h-96 bg-gray-800 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">No movies available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-96 bg-gray-900 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
      <div className="absolute inset-0 flex items-center z-20 p-8">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">
            {heroMovie.title}
          </h1>
          <p className="text-gray-200 text-lg mb-6 line-clamp-3">
            {heroMovie.overview}
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors">
              Play
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700 transition-colors">
              More Info
            </button>
          </div>
        </div>
      </div>
      {heroMovie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          alt={heroMovie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}