-- migrate:up
CREATE TABLE candidates (
    id          uuid PRIMARY KEY,
    full_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    resume_link VARCHAR(255) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE candidates;
