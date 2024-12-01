const express = require('express');
const authenticateToken = require('../middlewares/auth');
const db = require('../db');
const router = express.Router();

// Get All Tasks
router.get('/', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM tasks WHERE userId = ?`, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    res.status(200).json(rows);
  });
});

// Create a Task
router.post('/create', authenticateToken, (req, res) => {
  const { text } = req.body;

  db.run(
    `INSERT INTO tasks (userId, text) VALUES (?, ?)`,
    [req.user.id, text],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to create task.' });
      res.status(201).json({ id: this.lastID, text, completed: 0 });
    }
  );
});

// Update Task Completion
router.patch('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.run(
    `UPDATE tasks SET completed = ? WHERE id = ? AND userId = ?`,
    [completed, id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to update task.' });
      res.status(200).json({ message: 'Task updated successfully.' });
    }
  );
});

// Delete a Task
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM tasks WHERE id = ? AND userId = ?`, [id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: 'Failed to delete task.' });
    res.status(200).json({ message: 'Task deleted successfully.' });
  });
});

module.exports = router;
