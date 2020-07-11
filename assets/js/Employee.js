const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./connection');

class Employee {
  constructor(firstName, lastName, roleID, managerID) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }

  getByName(firstName, lastName) {
    if (!firstName || !lastName) {
      firstName = this.firstName;
      lastName = this.lastName;
    }
    const query = `
    SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name, e.role_id, e.manager_id 
    FROM employee e
    LEFT JOIN employee_role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON r.department_id = d.id
    WHERE e.first_name LIKE ? 
    AND e.last_name LIKE ?`;
    connection.query(query, [firstName, lastName], (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  add(firstName, lastName, roleID, managerID) {
    if (!firstName || !lastName || !roleID || !managerID) {
      firstName = this.firstName;
      lastName = this.lastName;
      roleID = this.roleID;
      managerID = this.managerID;
    }
    const query = `
    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES
    (?, ?, ?, ?)
    `;
    connection.query(
      query,
      [firstName, lastName, roleID, managerID],
      (err, res) => {
        if (err) throw err;
        console.log('Successfully added new employee.');
      }
    );
  }

  updateRole(newRoleID, newManagerID, firstName, lastName) {
    if (!newRoleID || !newManagerID) {
      return console.log(
        'Oops, please provide a new role ID and a new manager ID.'
      );
    }
    if (firstName === undefined || lastName === undefined) {
      firstName = this.firstName;
      lastName = this.lastName;
    }
    const query = `
    UPDATE employee
    SET role_id = ?
    WHERE first_name = ?
    AND last_name = ?
    `;
    connection.query(query, [newRoleID, firstName, lastName], (err, res) => {
      if (err) throw err;
      console.log('Successfully updated employee role.');
    });
  }

  delete(firstName, lastName) {
    if (!firstName || !lastName) {
      firstName = this.firstName;
      lastName = this.lastName;
    }
    const query = `
    DELETE FROM employee
    WHERE first_name = ?
    AND last_name = ?
    `;
    connection.query(query, [firstName, lastName], (err, res) => {
      if (err) throw err;
      console.log('Successfully deleted employee.');
    });
  }

  getAllEmployees() {
    const query = `
    SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name, e.role_id, e.manager_id 
    FROM employee e
    LEFT JOIN employee_role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON r.department_id = d.id`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }
}

module.exports = Employee;
