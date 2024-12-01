const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./todo-app.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    // Create Users Table
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
        } else {
          console.log('Users table created or already exists.');
        }
      }
    );

    // Create Tasks Table
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        text TEXT NOT NULL,
        completed INTEGER DEFAULT 0 CHECK (completed IN (0, 1)), -- 0 for incomplete, 1 for complete
        dueDate TEXT DEFAULT NULL, -- Optional due date for tasks
        priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium', -- Task priority
        sharedWith TEXT DEFAULT NULL, -- JSON array of emails the task is shared with
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP, -- Timestamp for task creation
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP, -- Timestamp for task update
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,
      (err) => {
        if (err) {
          console.error('Error creating tasks table:', err.message);
        } else {
          console.log('Tasks table created or already exists.');
        }
      }
    );
  }
});

module.exports = db;
