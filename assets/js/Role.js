const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'macDATAbase!6799',
  database: 'employee_db',
});

class Role {
  constructor(title, salary, departmentID) {
    this.title = title;
    this.salary = salary;
    this.departmentID = departmentID;
  }

  getAllUnder(title) {
    if (!title) {
      title = this.title;
    }
    const query = `
    SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name, e.role_id, e.manager_id 
    FROM employee e
    LEFT JOIN employee_role r
    LEFT JOIN department d
    ON r.department_id = d.id
    ON e.role_id = r.id
    WHERE d.id = r.department_id
    AND r.title = ?
    `;
    connection.query(query, title, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }
  add(title, salary, departmentID) {
    if (!title || !salary || !departmentID) {
      title = this.title;
      salary = this.salary;
      departmentID = this.departmentID;
    }
    const query = `
    INSERT INTO employee_role
    (title, salary, department_id)
    VALUES
    (?, ?, ?)`;
    connection.query(query, [title, salary, departmentID], (err, res) => {
      if (err) throw err;
      console.log('Role successfully added.');
    });
  }

  delete(title) {
    if (!title) {
      title = this.title;
    }
    const query = `
    DELETE FROM employee_role
    WHERE title = ?
    `;
    connection.query(query, title, (err, res) => {
      console.log('Role successfully deleted.');
    });
  }
}

module.exports = Role;
