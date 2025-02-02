CREATE TABLE IF NOT EXISTS guestComments (
  id INT PRIMARY KEY GENERATED ALWAYS AS identity,
  name VARCHAR(30),
  comment TEXT
);

INSERT INTO guestComments (name, comment) VALUES 
('Rosie', 'I am the first to comment!'),
('Taylor', 'I am the second to comment!');