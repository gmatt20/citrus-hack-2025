"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  id: number;
}

interface ApiResponse {
  recommendation: string;
  matching_movies: Movie[];
}

export default function MovieResults() {
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    try {
      // Get results from localStorage
      const resultString = localStorage.getItem('movieResults');
      if (resultString) {
        const parsedResult = JSON.parse(resultString) as ApiResponse;
        setRecommendation(parsedResult.recommendation);
        setMovies(parsedResult.matching_movies);
      }
    } catch (error) {
      console.error('Error parsing movie results:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black to-red-900 relative overflow-hidden py-20 px-6"
    >
      {/* Header with recommendation */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Movie Recommendations</h1>
        
        {loading ? (
          <div className="text-white text-xl">Loading recommendations...</div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-lg">
              <p className="text-amber-400 text-xl italic">{recommendation}</p>
            </div>
          
            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-red-500/50 border-2 border-red-800"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-poster.jpg"}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{movie.release_date.split('-')[0]} • {movie.vote_average.toFixed(1)}⭐</p>
                    <p className="text-gray-400 text-sm line-clamp-3">{movie.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* Back button */}
        <div className="mt-10">
          <Link href="/onboarding" className="bg-amber-600 py-3 px-8 text-xl rounded-full text-white transition-transform duration-200 ease-in-out font-bold inline-block hover:scale-105">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}