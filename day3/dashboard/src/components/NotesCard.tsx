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
    <div className="card">
      <h3>Notes</h3>
      <div className="add-row">
        <input placeholder="New note..." value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="notes-list">
        {notes.map((n) => (
          <li key={n.id} className="note-row">
            <div>
              <input type="checkbox" checked={n.done} onChange={() => dispatch(toggleDone(n.id))} />
              <span style={{ textDecoration: n.done ? 'line-through' : undefined, color: n.done ? 'green' : undefined, marginLeft: 8 }}>
                {n.text}
              </span>
            </div>
            <div>
              <button onClick={() => dispatch(removeNote(n.id))}>Remove</button>
            </div>
          </li>
        ))}
        {notes.length === 0 && <li className="muted">No notes yet</li>}
      </ul>
    </div>
  );
}
