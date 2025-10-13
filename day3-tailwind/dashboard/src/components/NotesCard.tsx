import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addNote, toggleDone, removeNote } from '../features/notes/notesSlice';

export default function NotesCard() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((s) => s.notes.notes);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addNote(text.trim()));
    setText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold">Notes</h3>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="New note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 rounded-md bg-[color:var(--accent)] text-white hover:opacity-95"
        >
          Add
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {notes.length === 0 && <li className="text-sm text-[color:var(--muted)]">No notes yet</li>}

        {notes.map((n) => (
          <li key={n.id} className="flex justify-between items-center border-b border-dashed pb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={n.done}
                onChange={() => dispatch(toggleDone(n.id))}
                className="h-4 w-4"
                aria-label={`Mark note ${n.text} as done`}
              />
              <span className={`ml-3 ${n.done ? 'line-through text-green-600' : ''}`}>{n.text}</span>
            </div>

            <div>
              <button
                onClick={() => dispatch(removeNote(n.id))}
                className="text-sm px-2 py-1 rounded-md bg-red-500 text-white hover:opacity-95"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
