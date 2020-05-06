DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task VARCHAR(255),
  assignee VARCHAR(100),
  category VARCHAR(100),
  complete VARCHAR(10)
)
