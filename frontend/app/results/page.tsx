"use client";

import React, {useState,useEffect} from "react";

const moviePosters = [
  {
    title: "Black Panther",
    src: "/posters/blackpanther.jpg",
  },
  {
    title: "Chhichhore",
    src: "/posters/chhichhore.jpg",
  },
  {
    title: "Titanic",
    src: "/posters/titanic.jpg",
  },
];

export default function MovieResults() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000000,rgb(109, 28, 28))",
        position: "relative",
        overflow: "hidden",
        padding: "80px 20px",
      }}>
      {/* Spotlight cursor effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(350px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.12), transparent 90%)`
        }}
      ></div>
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginTop: "100px",
        }}>
        {moviePosters.map((movie, index) => (
          <div
            key={index}
            style={{
              width: "180px",
              height: "270px",
              overflow: "hidden",
              border: "4px solid red",
              borderRadius: "5px",
              transition: "transform 0.3s ease",
            }}
            className="movie-box">
            <img
              src={movie.src}
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
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
