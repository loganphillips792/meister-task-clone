-- +migrate Up
CREATE TABLE IF NOT EXISTS sections
(
    id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(40) DEFAULT NULL,
    color VARCHAR(7) NOT NULL,
    -- limit VARCHAR(50) DEFAULT NULL,
    project_id uuid,
    sequence INTEGER DEFAULT NULL,
    description VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects (id)
);

-- +migrate Down
DROP TABLE sections;