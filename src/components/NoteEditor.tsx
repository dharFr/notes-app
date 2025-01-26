'use client';

import { Note } from '@/types/Note';
import { useState } from 'react';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface NoteEditorProps {
  initialNote?: Note;
  isNew?: boolean;
}

export default function NoteEditor({ initialNote, isNew = false }: NoteEditorProps) {
  const router = useRouter();
  const [note, setNote] = useState<Partial<Note>>(
    initialNote || {
      title: '',
      content: '',
    }
  );

  const handleSave = () => {
    if (!note.title || !note.content) return;

    const timestamp = Date.now();
    const completeNote: Note = {
      id: note.id || crypto.randomUUID(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt || timestamp,
      updatedAt: timestamp,
    };

    storage.saveNote(completeNote);
    router.push('/');
  };

  console.log(isNew ? 'new note' : 'edit note');
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Titre de la note"
        className="w-full p-2 text-xl font-bold bg-transparent border-b focus:outline-none focus:border-foreground"
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        placeholder="Contenu de la note..."
        className="w-full h-[60vh] p-2 bg-transparent focus:outline-none resize-none"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
} 