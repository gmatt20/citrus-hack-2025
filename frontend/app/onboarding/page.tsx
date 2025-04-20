"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

function NotesForm({
  feeling,
  setFeeling,
}: {
  feeling: string;
  setFeeling: (val: string) => void;
}) {
  return (
    <input
      className="border-2 w-full px-5 py-2.5 rounded-lg text-2xl mb-6"
      type="text"
      name="note"
      placeholder="e.g. excited, chill, sad, romantic..."
      value={feeling}
      onChange={(e) => setFeeling(e.target.value)}
    />
  );
}

export default function OnboardingPage() {
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [feeling, setFeeling] = useState("");
  const createNote = useMutation(api.notes.createNote);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feeling || !language || !genre) {
      alert("Please complete all fields.");
      return;
    }

    await createNote({
      note: feeling,
      genre,
      language,
    });

    setFeeling("");
    setGenre("");
    setLanguage("");

    router.push("/results");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-white font-sans">
      <form onSubmit={handleSubmit}>
        <h2
          className="mb-10 md:text-5xl text-3xl text-center"
          style={{
            fontFamily: '"Homemade Apple", cursive',
          }}>
          How are you feeling today?
        </h2>

        {/* Feeling input box */}
        <NotesForm feeling={feeling} setFeeling={setFeeling} />

        {/* Dropdowns */}
        <div className="flex justify-center max-md:items-center  flex-wrap gap-10 mb-8">
          {/* Language */}
          <div>
            <label htmlFor="language" className="text-2xl mr-3">
              Language:
            </label>
            <select
              className="p-2 rounded text-2xl border-2 text-white max-md:flex"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}>
              <option value="">Select</option>
              <option value="English" className="text-black">
                English
              </option>
              <option value="Hindi" className="text-black">
                Hindi
              </option>
              <option value="Japanese" className="text-black">
                Japanese
              </option>
              <option value="Spanish" className="text-black">
                Spanish
              </option>
            </select>
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="text-2xl mr-3">
              Genre:
            </label>
            <select
              className="p-2 rounded text-2xl border-2 text-white max-md:flex"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select</option>
              <option value="Action" className="text-black">
                Action
              </option>
              <option value="Comedy" className="text-black">
                Comedy
              </option>
              <option value="Romance" className="text-black">
                Romance
              </option>
              <option value="Thriller" className="text-black">
                Thriller
              </option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-amber-600 py-3 px-8 text-xl rounded-full text-white transition-transform duration-200 ease-in-out"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }>
            🔍 Search Movies
          </button>
        </div>
      </form>
    </div>
  );
}
