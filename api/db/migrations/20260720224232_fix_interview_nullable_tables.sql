-- migrate:up
ALTER TABLE interviews ALTER COLUMN started_at DROP NOT NULL;
ALTER TABLE interviews ALTER COLUMN completed_at DROP NOT NULL;


-- migrate:down
ALTER TABLE interviews ALTER COLUMN started_at SET NOT NULL;
ALTER TABLE interviews ALTER completed_at SET NOT NULL;
