'use client';

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Content() {
  return <div>Authenticated content</div>;
}

export default function OnboardingPage() {
  const [feeling, setFeeling] = useState('');
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');

  const createNote = useMutation(api.notes.createNote); // move this here so NotesForm can use state

  function NotesForm() {
    return (
      <form
      onSubmit={(e) => {
        e.preventDefault();
        void createNote({ note: feeling });
        setFeeling('');
      }}
      
      >
        <input
          type="text"
          name="note"
          placeholder="e.g. excited, chill, sad, romantic..."
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '24px',
            border: 'none',
            marginBottom: '25px',
            width: '400px',
          }}
        />
        <button
          className="button-zoom"
          type="submit"
        >
          🔍 Search Movies
        </button>
      </form>
    );
  }

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
      <h2 style={{ marginBottom: '20px', fontFamily: '"Homemade Apple", cursive', fontSize: '40px' }}>
        How are you feeling today?
      </h2>

      {/* 🆕 Inject NotesForm here */}
      <NotesForm />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '100px',
        marginBottom: '30px',
        flexWrap: 'wrap',
      }}>
        <div>
          <label htmlFor="language" style={{ marginRight: '8px', fontSize: '24px' }}>Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '24px',
            }}
          >
            <option value="">Select</option>
            <option value="English" className='text-black'>English</option>
            <option value="Hindi" className='text-black'>Hindi</option>
            <option value="Japanese" className='text-black'>Japanese</option>
            <option value="Spanish" className='text-black'>Spanish</option>
          </select>
        </div>

        <div>
          <label htmlFor="genre" style={{ marginRight: '8px', fontSize: '24px' }}>Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              fontSize: '24px',
            }}
          >
            <option value="">Select</option>
            <option value="Action" className='text-black'>Action</option>
            <option value="Comedy" className='text-black'>Comedy</option>
            <option value="Romance" className='text-black'>Romance</option>
            <option value="Thriller" className='text-black'>Thriller</option>
          </select>
        </div>
      </div>
    </div>
  );
}