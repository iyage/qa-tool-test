const pool = require('./db');

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, email FROM users');
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT id, email FROM users WHERE id = ?', [id]);
  return rows[0] ?? null;
}
async function getUserPosts(id) {
  const [rows] = await pool.query('SELECT  FROM posts WHERE user_id = ?', [id]);
  return rows;
}

async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT id, email FROM users WHERE email = ?', [email]);
  return rows[0] ?? null;
}

async function updateUser(id, { email, password }) {
  const fields = [];
  const values = [];
  if (email) { fields.push('email = ?'); values.push(email); }
  if (password) { fields.push('password = ?'); values.push(password); }
  values.push(id);

  const [result] = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  return result.affectedRows > 0;
}

async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function findByCredentials(email, password) {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
  return rows[0] ?? null;
}

module.exports = { getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser, findByCredentials, getUserPosts };
