INSERT INTO department (department_name) VALUES ('IT');
INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('HR');
INSERT INTO department (department_name) VALUES ('Executive');

INSERT INTO employee_role (title, salary, department_id) VALUES ('Technician', 40000.00, 1);
INSERT INTO employee_role (title, salary, department_id) VALUES ('IT Manager', 80000.00, 1);
INSERT INTO employee_role (title, salary, department_id) VALUES ('Sales Rep', 60000.00, 2);
INSERT INTO employee_role (title, salary, department_id) VALUES ('Sales Manager', 80000.00, 2);
INSERT INTO employee_role (title, salary, department_id) VALUES ('HR Rep', 40000.00, 3);
INSERT INTO employee_role (title, salary, department_id) VALUES ('HR Manager', 80000.00, 3);
INSERT INTO employee_role (title, salary, department_id) VALUES ('CEO', 99000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ichabod', 'Crane', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Shirley', 'Temple', 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Candy', 'Barr', 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Phil', 'Wright', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Warren', 'Peace', 5, 4);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;

SELECT First_name, last_name, title, department_name
FROM employee
RIGHT JOIN employee_role ON employee.role_id = employee_role.id
RIGHT JOIN department ON employee_role.department_id = department.id;
