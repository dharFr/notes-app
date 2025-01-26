'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/types/Note';
import { storage } from '@/lib/storage';
import Link from 'next/link';
import NoteList from '@/components/NoteList';

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(storage.getNotes());
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Notes</h1>
        <Link 
          href="/notes/new" 
          className="bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90"
        >
          Nouvelle Note
        </Link>
      </div>
      
      <NoteList notes={notes} />
    </div>
  );
}
