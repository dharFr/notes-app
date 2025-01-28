import { storage } from '../storage';
import { Note } from '@/types/Note';

describe('storage', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    localStorage.clear();
  });

  it('should return empty array when no notes exist', () => {
    const notes = storage.getNotes();
    expect(notes).toEqual([]);
  });

  it('should save and retrieve a note', () => {
    const testNote: Note = {
      id: '1',
      title: 'Test Note',
      content: 'Test Content',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    storage.saveNote(testNote);
    const notes = storage.getNotes();

    expect(notes).toHaveLength(1);
    expect(notes[0]).toEqual(testNote);
  });

  it('should update existing note', () => {
    const testNote: Note = {
      id: '1',
      title: 'Test Note',
      content: 'Test Content',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    storage.saveNote(testNote);
    
    const updatedNote = {
      ...testNote,
      title: 'Updated Title',
      updatedAt: Date.now(),
    };

    storage.saveNote(updatedNote);
    const notes = storage.getNotes();

    expect(notes).toHaveLength(1);
    expect(notes[0]).toEqual(updatedNote);
  });

  it('should delete a note', () => {
    const testNote: Note = {
      id: '1',
      title: 'Test Note',
      content: 'Test Content',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    storage.saveNote(testNote);
    storage.deleteNote(testNote.id);
    const notes = storage.getNotes();

    expect(notes).toHaveLength(0);
  });
}); 