-- migrate:up
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);

-- migrate:down
ALTER TABLE users DROP COLUMN IF EXISTS password_hash;