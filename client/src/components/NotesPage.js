// client/src/components/NotesPage.js
import React, { useState } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const NotesPage = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Call this to refresh the note list
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
  };

  const handleSuccess = () => {
    setCurrentNote(null);
    triggerRefresh();
  };

  return (
    <div>
      <NoteForm 
        currentNote={currentNote} 
        onSuccess={handleSuccess} 
        onCancel={() => setCurrentNote(null)}
      />
      <NoteList 
        onEdit={handleEdit} 
        refreshTrigger={refreshTrigger} 
      />
    </div>
  );
};

export default NotesPage;
