-- Insert sample departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Marketing'),
  ('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),
  ('Sales Representative', 50000, 1),
  ('Software Engineer', 75000, 2),
  ('Database Administrator', 70000, 2),
  ('Marketing Specialist', 60000, 3),
  ('Marketing Coordinator', 55000, 3),
  ('Financial Analyst', 65000, 4),
  ('Accountant', 60000, 4);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Jose', 'Perez', 1, NULL),
  ('Elizabeth', 'Rodriguez', 2, 1),
  ('Miguel', 'Estremera', 3, 1),
  ('Emily', 'Diaz', 4, 2),
  ('David', 'Rivera', 5, 2),
  ('Jennifer', 'Martinez', 6, 3),
  ('Christopher', 'Gonzalez', 7, 4),
  ('Jessica', 'Segura', 8, 4);
