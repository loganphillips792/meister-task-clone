-- +migrate Up
CREATE TABLE IF NOT EXISTS projects
(
    id uuid DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

-- +migrate Down
DROP TABLE projects;