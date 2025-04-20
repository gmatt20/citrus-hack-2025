'use client';

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function NotesForm({ language, genre }: { language: string; genre: string }) {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 "
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
      <button
        className = 'bg-amber-600'
        type="submit"
        style={{
          padding: '10px 30px',
          fontSize: '20px',
          borderRadius: '6px',
          color: 'white',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      >
        🔍 Search Movies
      </button>
    </form>
  );
}

export default function OnboardingPage() {
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  
  return (
    <div style={{
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

      <NotesForm language={language} genre={genre} />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
        marginBottom: '30px',
        flexWrap: 'wrap',
      }}>
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
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Japanese">Japanese</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

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
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
      </div>
    </div>
  );
}
