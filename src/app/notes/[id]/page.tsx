'use client';

import { useEffect, useState, use } from 'react';
import { Note } from '@/types/Note';
import { storage } from '@/lib/storage';
import NoteEditor from '@/components/NoteEditor';
import { notFound } from 'next/navigation';

export default function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const [note, setNote] = useState<Note | null>(null);
  const { id } = use(params);
  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      const foundNote = storage.getNotes().find(n => n.id === id);
      if (!foundNote) {
        notFound();
      }
      setNote(foundNote);
    }
  }, [id, isNew]);

  if (isNew) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <NoteEditor isNew />
      </div>
    );
  }

  if (!note) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <NoteEditor initialNote={note} />
    </div>
  );
} 