const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3001;

//Middlewares
app.use(cors());
app.use(express.json());

// Get all events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add new event
app.post('/api/events', (req, res) => {
  const { title, description, location, start_time, end_time } = req.body;
  const query = `INSERT INTO events (title, description, location, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, description, location, start_time, end_time];

  db.run(query, params, function (err) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Edit existing event
app.put('/api/events/:id', (req, res) => {
  const { title, description, location, start_time, end_time } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE events
    SET title = ?, description = ?, location = ?, start_time = ?, end_time = ?
    WHERE id = ?
  `;
  const params = [title, description, location, start_time, end_time, id];

  db.run(query, params, function (err) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.json({ message: "Event updated successfully" });
    }
  });
});

// Delete event
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM events WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.set('Content-Type', 'application/json; charset=utf-8');
      res.json({ message: "Event deleted successfully" });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});