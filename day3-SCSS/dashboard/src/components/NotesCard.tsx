
import { useState } from 'react';
import styles from './NotesCard.module.scss';

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
    <div className={styles.card}>
      <h3>Notes</h3>

      <div className={styles.addRow}>
        <input
          aria-label="New note"
          placeholder="New note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button type="button" onClick={handleAdd}>Add</button>
      </div>

      <ul className={styles.notesList}>
        {notes.length === 0 && <li className={styles.muted}>No notes yet</li>}

        {notes.map((n) => (
          <li
            key={n.id}
            className={`${styles.noteRow} ${n.done ? styles.done : ''}`}
          >
            <div className={styles.left}>
              <input
                type="checkbox"
                checked={n.done}
                onChange={() => dispatch(toggleDone(n.id))}
                aria-label={`Mark note ${n.text} as done`}
              />
              <span className={styles.text}>{n.text}</span>
            </div>

            <div>
              <button
                type="button"
                onClick={() => dispatch(removeNote(n.id))}
                aria-label={`Remove note ${n.text}`}
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
