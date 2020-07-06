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

SELECT e.First_name, e.last_name, r.title, d.department_name, e.id
FROM employee e
RIGHT JOIN employee_role r ON e.role_id = r.id
RIGHT JOIN department d ON r.department_id = d.id;

SELECT r.salary
FROM employee e
LEFT JOIN employee_role r
LEFT JOIN department d
ON r.department_id = d.id
ON e.role_id = r.id
WHERE d.id = r.department_id
AND d.department_name = 'Sales';
