-- migrate:up
ALTER TABLE interviews ADD COLUMN candidate_id uuid REFERENCES candidates(id);

-- migrate:down
