import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Note = { id: string; text: string; done: boolean };

type NotesState = { notes: Note[] };
const initialState: NotesState = { notes: [] };

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<string>) {
      const id = Date.now().toString();
      state.notes.unshift({ id, text: action.payload, done: false });
    },
    toggleDone(state, action: PayloadAction<string>) {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) note.done = !note.done;
    },
    removeNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
    clearNotes(state) {
      state.notes = [];
    },
  },
});

export const { addNote, toggleDone, removeNote, clearNotes } = notesSlice.actions;
export default notesSlice.reducer;
