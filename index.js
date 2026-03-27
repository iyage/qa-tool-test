require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM users');
  return res.status(200).json(rows);

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  const [rows] = await pool.query(
    'SELECT id FROM users WHERE email = ? AND password = ?',
    [email, password]
  );

  if (rows.length == 0) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }

  return res.status(201).json({ message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
