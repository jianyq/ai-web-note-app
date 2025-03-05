// client/src/api/notes.js
import axios from 'axios';

// Get all notes
export const getNotes = () => axios.get('/notes');

// Get a single note by ID
export const getNoteById = (id) => axios.get(`/notes/${id}`);

// Create a new note
export const createNote = (noteData) => axios.post('/notes', noteData);

// Update an existing note
export const updateNote = (id, noteData) => axios.put(`/notes/${id}`, noteData);

// Delete a note
export const deleteNote = (id) => axios.delete(`/notes/${id}`);
