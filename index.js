require('dotenv').config();
const express = require('express');
const userService = require('./userService');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', async (_req, res) => {
  // try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  // } catch (error) {
  //   console.error('Error fetching users:', error);
  //   return res.status(500).json({ message: 'Internal server error' });
  // }
});

app.get('/api/users/id/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/users/:email', async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({ message: 'At least one field (email, password) is required' });
  }
  try {
    const updated = await userService.updateUser(req.params.id, { email, password });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }
  try {
    const user = await userService.findByCredentials(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid email or password!' });
    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
