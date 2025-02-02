'use client';

import { Note } from '@/types/Note';
import { useState, useRef } from 'react';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import DOMPurify from 'dompurify';

interface NoteEditorProps {
  initialNote?: Note;
  isNew?: boolean;
}

export default function NoteEditor({ initialNote, isNew = false }: NoteEditorProps) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
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

  const handleFormat = (format: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;

    // Sauvegarder la sélection
    const range = selection.getRangeAt(0);
    
    switch (format) {
      case 'bold':
      case 'italic': {
        const element = document.createElement(format === 'bold' ? 'strong' : 'em');
        if (range.toString().length > 0) {
          element.textContent = range.toString();
          range.deleteContents();
          range.insertNode(element);
        }
        break;
      }
      case 'list': {
        const list = document.createElement(value === 'ordered' ? 'ol' : 'ul');
        const item = document.createElement('li');
        
        if (range.toString().length > 0) {
          item.textContent = range.toString();
          list.appendChild(item);
          range.deleteContents();
          range.insertNode(list);
        } else {
          item.textContent = ' ';
          list.appendChild(item);
          range.insertNode(list);
        }
        break;
      }
      case 'heading': {
        const heading = document.createElement(`h${value}`);
        if (range.toString().length > 0) {
          heading.textContent = range.toString();
          range.deleteContents();
          range.insertNode(heading);
        }
        break;
      }
    }

    // Mettre à jour le contenu dans l'état avec sanitization
    if (editorRef.current) {
      const sanitizedContent = DOMPurify.sanitize(editorRef.current.innerHTML, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'br'],
        ALLOWED_ATTR: []
      });
      setNote(prev => ({ ...prev, content: sanitizedContent }));
    }
  };

  // Sanitize initial content
  const sanitizedContent = note.content ? DOMPurify.sanitize(note.content, {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'br'],
    ALLOWED_ATTR: []
  }) : '';

  return (
    <div className={`space-y-4 ${isNew ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        placeholder="Note title"
        className="w-full p-2 text-xl font-bold bg-transparent border-b focus:outline-none focus:border-foreground"
      />
      
      <div className="flex gap-2 p-2 border-b">
        <button 
          onClick={() => handleFormat('bold')} 
          className="p-2 hover:bg-gray-100 rounded"
        >
          <strong>B</strong>
        </button>
        <button 
          onClick={() => handleFormat('italic')} 
          className="p-2 hover:bg-gray-100 rounded"
        >
          <em>I</em>
        </button>
        <button 
          onClick={() => handleFormat('list', 'unordered')} 
          className="p-2 hover:bg-gray-100 rounded"
        >
          • Liste
        </button>
        <button 
          onClick={() => handleFormat('list', 'ordered')} 
          className="p-2 hover:bg-gray-100 rounded"
        >
          1. Liste
        </button>
        <button 
          onClick={() => handleFormat('heading', '1')} 
          className="p-2 hover:bg-gray-100 rounded"
        >
          H1
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="w-full h-[60vh] p-2 bg-transparent focus:outline-none"
        onInput={(e) => {
          const sanitizedContent = DOMPurify.sanitize(e.currentTarget.innerHTML, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'br'],
            ALLOWED_ATTR: []
          });
          setNote({ ...note, content: sanitizedContent });
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        placeholder="Start writing your note..."
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
} 