'use client';

import { Note } from '@/types/Note';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Link 
          key={note.id} 
          href={`/notes/${note.id}`}
          className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          <h2 className="font-bold">{note.title}</h2>
          <p 
            className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: note.content }}
          >
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Last modified: {new Date(note.updatedAt).toLocaleDateString('en-EN')}
          </p>
        </Link>
      ))}
    </div>
  );
} 