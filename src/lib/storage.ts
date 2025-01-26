import { Note } from '@/types/Note';

const STORAGE_KEY = 'notes';

export const storage = {
  getNotes: (): Note[] => {
    if (typeof window === 'undefined') return [];
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  },

  saveNote: (note: Note): void => {
    const notes = storage.getNotes();
    const existingNoteIndex = notes.findIndex(n => n.id === note.id);
    
    if (existingNoteIndex >= 0) {
      notes[existingNoteIndex] = note;
    } else {
      notes.push(note);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },

  deleteNote: (id: string): void => {
    const notes = storage.getNotes().filter(note => note.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
}; 