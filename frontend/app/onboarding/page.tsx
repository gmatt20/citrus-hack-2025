"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

// export function NotesList() {
//   const notes = useQuery(api.notes.getNotes);
//   return (
//     <div>
//       {notes?.slice(-3).reverse().map((note) => (
//         <div key={note._id} className="mb-4 p-4 bg-gray-800 rounded text-white">
//           <p><strong>Old queries: </strong>{note.note}, {note.genre}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

function NotesForm({ feeling, setFeeling }: { feeling: string; setFeeling: (val: string) => void; }) {
  return (
    <input
      className="border-2 w-full px-5 py-2.5 rounded-lg text-2xl mb-6"
      type="text"
      name="note"
      placeholder="e.g. excited, chill, sad, romantic..."
      value={feeling}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      onChange={(e) => setFeeling(e.target.value)}
    />
  );
}

export default function OnboardingPage() {
  const [genre, setGenre] = useState("");
  const [feeling, setFeeling] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const createNote = useMutation(api.notes.createNote);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling || !genre) {
      alert("Please complete all fields.");
      return;
    }
    await createNote({ note: feeling, genre, });
    setFeeling("");
    setGenre("");
    router.push("/results");
  };

  return (
    <div
      className="min-h-screen overflow-y-hidden flex flex-col items-center justify-center p-10 text-white font-[geist] relative overflow-hidden">

      <form onSubmit={handleSubmit} className="z-10">
        <h2
          className="mb-10 md:text-5xl text-3xl translate-y-[-5vh] text-center"
          style={{ fontFamily: '"Homemade Apple", cursive' }}>
          Choose your movie mood!
        </h2>

        <NotesForm feeling={feeling} setFeeling={setFeeling} />
        {/* <NotesList /> */}

        <div className="flex justify-center max-md:items-center flex-wrap gap-10 mb-8">

          <div>
            <label htmlFor="genre" className="text-2xl mr-3">Genre:</label>
            <select
              className="p-2 rounded text-2xl border-2 text-white max-md:flex"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select</option>
              <option value="Action" className="text-black">Action</option>
              <option value="Comedy" className="text-black">Comedy</option>
              <option value="Romance" className="text-black">Romance</option>
              <option value="Thriller" className="text-black">Thriller</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-amber-600 py-3 px-8 text-xl rounded-full text-white transition-transform duration-200 ease-in-out font-bold"
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            🔍 Search Movies
          </button>
        </div>
      </form>
    </div>
  );
}
