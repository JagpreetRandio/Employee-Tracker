
INSERT INTO department (name)
VALUES
  ('HR'),
  ('Tech'),
  ('Marketing'),
  ('Finance'),
  ('Sales'),
  ('Engineering'),
  ('Legal'),
  ('Executive');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Recruiter ', 50000, 1),
  ('Marketer', 65000, 3),
  ('Software Engineer', 120000, 2),
  ('Attorney', 200000, 7),
  ('Salesperson', 130000, 5),
  ('Engineer', 190000, 6),
  ('Accountant', 160000, 8),
  ('Sales Lead', 130000, 5),
  ('CEO', 500000, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Jagpreet', 'Randio', 8, 1),
  ('Paris', 'Hilton', 2, 2),
  ('London', 'Tipton', 3, 1),
  ('Sharpay', 'Evans', 4, 3),
  ('Elle', 'Woods', 5, 1),
  ('Angelina', 'Jolie',1, 3),
  ('Tanya', 'McQuid', 6, 3);