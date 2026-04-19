-- dbdev schema

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(50) DEFAULT 'guest',
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS files (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  description   TEXT,
  appwrite_id   VARCHAR(255) NOT NULL,
  category      VARCHAR(100),
  is_public     BOOLEAN DEFAULT TRUE,
  uploaded_by   INTEGER REFERENCES users(id),
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  tech_stack    TEXT[],
  repo_url      VARCHAR(255),
  live_url      VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at    TIMESTAMP DEFAULT NOW()
);
