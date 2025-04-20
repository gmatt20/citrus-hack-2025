'use client';

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

function NotesForm({ language, genre, feeling, setFeeling }: {
  language: string;
  genre: string;
  feeling: string;
  setFeeling: (val: string) => void;
}) {
  return (
    <input
      className="border-2"
      type="text"
      name="note"
      placeholder="e.g. excited, chill, sad, romantic..."
      value={feeling}
      onChange={(e) => setFeeling(e.target.value)}
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '24px',
        marginBottom: '25px',
        width: '400px',
      }}
    />
  );
}

export default function OnboardingPage() {
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [feeling, setFeeling] = useState('');

  const createNote = useMutation(api.notes.createNote);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!feeling || !language || !genre) {
      alert("Please complete all fields.");
      return;
    }

    void createNote({
      note: feeling,
      genre,
      language,
    });

    setFeeling('');
    setGenre('');
    setLanguage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgb(109, 28, 28))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{
        marginBottom: '20px',
        fontFamily: '"Homemade Apple", cursive',
        fontSize: '40px'
      }}>
        How are you feeling today?
      </h2>

      {/* Feeling input box */}
      <NotesForm language={language} genre={genre} feeling={feeling} setFeeling={setFeeling} />

      {/* Dropdowns */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
        marginBottom: '30px',
        flexWrap: 'wrap',
      }}>
        {/* Language */}
        <div>
          <label htmlFor="language" style={{ fontSize: '24px' }}>Language:</label>
          <select
            className="border-2 text-white"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '24px',
              color: 'white',
            }}
          >
            <option value="">Select</option>
            <option value="English" className="text-black">English</option>
            <option value="Hindi" className="text-black">Hindi</option>
            <option value="Japanese" className="text-black">Japanese</option>
            <option value="Spanish" className="text-black">Spanish</option>
          </select>
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" style={{ fontSize: '24px' }}>Genre:</label>
          <select
            className="border-2 text-white"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '24px',
              color: 'white',
            }}
          >
            <option value="">Select</option>
            <option value="Action" className="text-black">Action</option>
            <option value="Comedy" className="text-black">Comedy</option>
            <option value="Romance" className="text-black">Romance</option>
            <option value="Thriller" className="text-black">Thriller</option>
          </select>
        </div>
      </div>

      {/* 🔍 Search Button (now below everything) */}
      <Link href='/results'>
        <button
          type="submit"
          className="bg-amber-600"
          style={{
            padding: '10px 30px',
            fontSize: '20px',
            borderRadius: '25px',
            color: 'white',
            transition: 'transform 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
        >
          🔍 Search Movies
        </button>
      </Link>
    </form>
  );
}
