// client/src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../api/notes';

const NoteList = ({ onEdit, refreshTrigger }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes(); // Refresh list after deletion
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        notes.map(note => (
          <div key={note.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => onEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default NoteList;
