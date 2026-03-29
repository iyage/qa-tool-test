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

app.get('/api/users/id/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/users/:email', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email FROM users WHERE email = ?', [req.params.email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ message: 'User deleted' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.warn('Email or password missing in request body');
    return res.status(400).json({ message: 'Email and password are required!' });
  }
  try {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE email = ? AND password = ?',
    [email, password]
  );

    if (rows.length === 0) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }

    return res.status(201).json({ message: 'Login successful!!!!' });

} catch (error) {
  console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error!!!!!' });
}
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
