'use client';

import { useEffect, useState } from 'react';
import { Note } from '@/types/Note';
import { storage } from '@/lib/storage';
import Link from 'next/link';
import NoteList from '@/components/NoteList';
import AboutModal from '@/components/AboutModal'

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  useEffect(() => {
    setNotes(storage.getNotes());
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Link 
          href="/notes/new" 
          className="bg-foreground text-background px-4 py-2 rounded-lg hover:opacity-90"
        >
          New Note
        </Link>
      </div>
      
      <NoteList notes={notes} />

      <div className="mt-auto flex justify-end pt-8">
        <button
          onClick={() => setIsAboutOpen(true)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          About
        </button>
      </div>

      <AboutModal isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} />
    </div>
  );
}
