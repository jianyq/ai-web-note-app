// client/src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../api/notes';

const NoteForm = ({ currentNote, onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Populate form when editing an existing note
  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentNote) {
        // Update existing note
        await updateNote(currentNote.id, { title, content });
      } else {
        // Create new note (user_id set to 1 for demo purposes)
        await createNote({ title, content, user_id: 1 });
      }
      // Clear the form and notify parent to refresh the list
      setTitle('');
      setContent('');
      onSuccess();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #aaa', padding: '15px', marginBottom: '20px' }}>
      <h3>{currentNote ? 'Edit Note' : 'Create Note'}</h3>
      <div>
        <label>Title: </label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Content: </label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
      {currentNote && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default NoteForm;
