import { render, screen } from '@testing-library/react';
import NoteList from '../NoteList';
import { Note } from '@/types/Note';

describe('NoteList', () => {
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Test Note 1',
      content: 'Test Content 1',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      title: 'Test Note 2',
      content: 'Test Content 2',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  it('renders all notes', () => {
    render(<NoteList notes={mockNotes} />);

    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  it('renders note content preview', () => {
    render(<NoteList notes={mockNotes} />);

    expect(screen.getByText('Test Content 1')).toBeInTheDocument();
    expect(screen.getByText('Test Content 2')).toBeInTheDocument();
  });

  it('renders empty div when no notes', () => {
    const { container } = render(<NoteList notes={[]} />);
    
    expect(container.firstChild).toBeEmptyDOMElement();
  });
}); 