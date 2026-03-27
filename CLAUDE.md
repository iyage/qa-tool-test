# pull-test

Express 5 REST API. Node.js, MySQL (mysql2 pool), Jest + Supertest.

## Commands

```bash
npm start   # node index.js, port 5000 (or $PORT)
npm test    # jest
```

## Environment

Copy `.env` and fill in credentials — never committed.

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=pull_test
```

## Architecture

Single-file Express app ([index.js](index.js)) backed by a mysql2 connection pool ([db.js](db.js)). Pool config in `db.js`, credentials via `dotenv`.

### DB Schema (expected)

```sql
CREATE TABLE users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

## API

```
GET  /             → 200 "Hello World!"
POST /api/login    → 200 | 400 (missing fields) | 401 (bad creds)
```

Login payload: `{ email, password }` — passwords still plaintext, no hashing.

## Known Gaps

- Passwords stored and compared in plaintext — needs bcrypt
- No JWT/session issued on successful login
- No global error handler — unhandled DB errors will crash the request
