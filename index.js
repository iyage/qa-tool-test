require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
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

  if (rows.length === 0) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }

  res.json({ message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
