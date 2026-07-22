-- migrate:up
CREATE TYPE interview_status AS ENUM ('scheduled', 'progress', 'started', 'canceled');

CREATE TABLE interviews
(
    id           uuid PRIMARY KEY,
    topic        VARCHAR(255) NOT NULL,
    status       interview_status,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    schedule_at  TIMESTAMPTZ NOT NULL,
    started_at   TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL
);

CREATE TYPE interview_member_role AS ENUM ('member', 'moderator');
CREATE TABLE interview_members (
    id           uuid PRIMARY KEY,
    interview_id uuid REFERENCES interviews(id),
    user_id      uuid REFERENCES users(id),
    role         interview_member_role
);
-- migrate:down
DROP TABLE interviews;
DROP TABLE interview_members;
DROP TYPE interview_status;
DROP TYPE interview_member_role;
