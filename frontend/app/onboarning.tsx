import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
function Content() {
  return <div>Authenticated content</div>;
}

function NotesForm() {
  const createNote = useMutation(api.notes.createNote);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const note = formData.get("note") as string;
        void createNote({ note })
        form.reset();
      }}
    >
    <input
      type="text"
      name="note"
      placeholder="Write your note here..."
      className="border px-3 py-2 rounded mr-2"
      required
      />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Submit
    </button>
    </form>
  )
}
