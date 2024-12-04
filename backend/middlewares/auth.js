const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate inputs
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.run(
      `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({ error: 'Email already exists.' });
          }
          return res.status(500).json({ error: 'Database error.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      }
    );
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/validate', async (req, res) =>{
  const {email, pass} = req.query;
  try{
    const find = await new Promise((resolve, reject) => {
      db.get(
          `
          SELECT email, password FROM Users
          WHERE email = ?
          `,
          [email],
          (e, row) => {
              if (e) {
                  reject(e); // Reject if there's an error
              }
              if (!row) {
                  return reject(new Error("User not found")); // Reject if user is not found
              }
              resolve(row);
          }
      );
      const isMatch = bcrypt.compare(password, user.password);
      console.log("Match: " + isMatch);
      
      if (isMatch == false) {
        return res.status(401).json('Invalid username or password');
    }
    res.send({ message: 'Login successful' });
  });
  } catch(error){
    return res.status(401).json('An error has occurred.');
  }
});

module.exports = router;
