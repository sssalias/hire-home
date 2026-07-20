-- migrate:up
CREATE TABLE users (
    id uuid PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255)
);

-- migrate:down
DROP TABLE users;
