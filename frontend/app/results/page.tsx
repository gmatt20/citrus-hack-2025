'use client';

import React from 'react';

const moviePosters = [
  {
    title: 'Black Panther',
    src: '/posters/blackpanther.jpg',
  },
  {
    title: 'Chhichhore',
    src: '/posters/chhichhore.jpg',
  },
  {
    title: 'Titanic',
    src: '/posters/titanic.jpg',
  },
];

export default function MovieResults() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000000,rgb(109, 28, 28))',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 20px',
    }}>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
        marginTop: '100px'
      }}>
        {moviePosters.map((movie, index) => (
          <div key={index} style={{
            width: '180px',
            height: '270px',
            overflow: 'hidden',
            border: '4px solid red',
            borderRadius: '5px',
            transition: 'transform 0.3s ease',
          }}
            className="movie-box"
          >
            <img
              src={movie.src}
              alt={movie.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      {/* CSS (Inline or Global) */}
      <style>{`
        .movie-box:hover {
          transform: scale(1.08);
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
