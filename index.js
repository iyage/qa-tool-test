const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }
  const user = data.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password!' });
  }
  res.json({ message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});