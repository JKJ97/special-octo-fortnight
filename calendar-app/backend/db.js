const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./events.db');

// Create table 
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL
    )
  `);
});

module.exports = db;