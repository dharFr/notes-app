import { render, screen, fireEvent } from '@testing-library/react';
import NoteEditor from '../NoteEditor';
import { storage } from '@/lib/storage';
import { Note } from '@/types/Note';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock storage
jest.mock('@/lib/storage', () => ({
  storage: {
    saveNote: jest.fn(),
  },
}));

// Mock crypto.randomUUID
const mockRandomUUID = jest.fn(() => 'test-uuid');
Object.defineProperty(global, 'crypto', {
  value: { randomUUID: mockRandomUUID }
});

describe('NoteEditor', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test Content',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty form for new note', () => {
    render(<NoteEditor isNew />);

    expect(screen.getByPlaceholderText('Titre de la note')).toHaveValue('');
    expect(screen.getByPlaceholderText('Contenu de la note...')).toHaveValue('');
  });

  it('renders form with initial note data', () => {
    render(<NoteEditor initialNote={mockNote} />);

    expect(screen.getByPlaceholderText('Titre de la note')).toHaveValue('Test Note');
    expect(screen.getByPlaceholderText('Contenu de la note...')).toHaveValue('Test Content');
  });

  it('updates note content when typing', () => {
    render(<NoteEditor isNew />);

    const titleInput = screen.getByPlaceholderText('Titre de la note');
    const contentInput = screen.getByPlaceholderText('Contenu de la note...');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Content' } });

    expect(titleInput).toHaveValue('New Title');
    expect(contentInput).toHaveValue('New Content');
  });

  it('does not save when title or content is empty', () => {
    render(<NoteEditor isNew />);

    const saveButton = screen.getByText('Sauvegarder');
    fireEvent.click(saveButton);

    expect(storage.saveNote).not.toHaveBeenCalled();
  });

  it('saves note when both title and content are filled', () => {
    render(<NoteEditor isNew />);

    const titleInput = screen.getByPlaceholderText('Titre de la note');
    const contentInput = screen.getByPlaceholderText('Contenu de la note...');
    const saveButton = screen.getByText('Sauvegarder');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Content' } });
    fireEvent.click(saveButton);

    expect(storage.saveNote).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Title',
      content: 'New Content',
    }));
  });

  it('preserves note ID when editing existing note', () => {
    render(<NoteEditor initialNote={mockNote} />);

    const titleInput = screen.getByPlaceholderText('Titre de la note');
    const saveButton = screen.getByText('Sauvegarder');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.click(saveButton);

    expect(storage.saveNote).toHaveBeenCalledWith(expect.objectContaining({
      id: mockNote.id,
      title: 'Updated Title',
      content: mockNote.content,
    }));
  });

  it('generates new ID for new note using crypto.randomUUID', () => {
    render(<NoteEditor isNew />);

    const titleInput = screen.getByPlaceholderText('Titre de la note');
    const contentInput = screen.getByPlaceholderText('Contenu de la note...');
    const saveButton = screen.getByText('Sauvegarder');

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(contentInput, { target: { value: 'New Content' } });
    fireEvent.click(saveButton);

    expect(mockRandomUUID).toHaveBeenCalled();
    expect(storage.saveNote).toHaveBeenCalledWith(expect.objectContaining({
      id: 'test-uuid',
      title: 'New Title',
      content: 'New Content',
    }));
  });
}); 