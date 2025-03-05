const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// CREATE a new note
app.post('/notes', (req, res) => {
  const { user_id, title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const sql = `INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)`;
  db.run(sql, [user_id || 1, title, content], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while creating note.' });
    }
    res.status(201).json({ id: this.lastID, user_id, title, content });
  });
});

// READ all notes (for a specific user ideally; here we return all for simplicity)
app.get('/notes', (req, res) => {
  db.all('SELECT * FROM notes', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while fetching notes.' });
    }
    res.json(rows);
  });
});

// READ a single note by ID
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while fetching note.' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.json(row);
  });
});

// UPDATE a note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }
  const sql = `UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  db.run(sql, [title, content, id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while updating note.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.json({ id, title, content });
  });
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM notes WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while deleting note.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.json({ message: 'Note deleted successfully.' });
  });
});

// A simple root route
app.get('/', (req, res) => {
  res.send('AI Web Note App API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

