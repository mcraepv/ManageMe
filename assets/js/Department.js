const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'macDATAbase!6799',
  database: 'employee_db',
});

class Department {
  constructor(departmentName) {
    this.departmentName = departmentName;
  }

  getAllUnder(departmentName) {
    if (!departmentName) {
      departmentName = this.departmentName;
    }
    const query = `
    SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name, e.role_id, e.manager_id 
    FROM employee e
    LEFT JOIN employee_role r
    LEFT JOIN department d
    ON r.department_id = d.id
    ON e.role_id = r.id
    WHERE d.id = r.department_id
    AND d.department_name = ?
    `;
    connection.query(query, departmentName, (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  add(departmentName) {
    if (!departmentName) {
      departmentName = this.departmentName;
    }
    const query = `
    INSERT INTO department
    (department_name)
    VALUES
    (?)
    `;
    connection.query(query, departmentName, (err, res) => {
      if (err) throw err;
      console.log('Successfully created new department.');
    });
  }

  delete(departmentName) {
    if (!departmentName) {
      departmentName = this.departmentName;
    }
    const query = `
    DELETE FROM department
    WHERE department_name = ?
    `;

    connection.query(query, departmentName, (err, res) => {
      if (err) throw err;
      console.log('Department successfully deleted.');
    });
  }

  getBudget(departmentName) {
    if (!departmentName) {
      departmentName = this.departmentName;
    }
    const query = `
    SELECT r.salary 
    FROM employee e
    LEFT JOIN employee_role r
    LEFT JOIN department d
    ON r.department_id = d.id
    ON e.role_id = r.id
    WHERE d.id = r.department_id
    AND d.department_name = ?
    `;
    return connection.query(query, departmentName, (err, res) => {
      if (err) throw err;
      let totalBudget = 0;
      res.forEach((employee) => {
        const salary = parseInt(employee.salary);
        totalBudget += salary;
      });
      return console.table([{ 'Total Budget': totalBudget }]);
    });
  }
}

module.exports = Department;
