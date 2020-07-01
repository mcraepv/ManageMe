const mysql = require('mysql2');
const Employee = require('./Employee');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'macDATAbase!6799',
  database: 'employee_db',
});

class Manager extends Employee {
  constructor(firstName, lastName, roleID, managerID) {
    super(firstName, lastName, roleID, managerID);
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }

  getAllUnder(firstName, lastName) {
    if (!firstName || !lastName) {
      firstName = this.firstName;
      lastName = this.lastName;
    }

    let managerID;

    const managerIDQuery = `
    SELECT id
    FROM employee
    WHERE first_name = ?
    AND last_name = ?
    `;

    connection.query(managerIDQuery, [firstName, lastName], (err, res) => {
      if (err) throw err;
      console.log(res);
      managerID = res[0].id;
      const query = `
    SELECT e.first_name, e.last_name, r.title, r.salary, d.department_name
    FROM employee e
    LEFT JOIN employee_role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON r.department_id = d.id
    WHERE e.manager_id = ?
    `;
      connection.query(query, managerID, (err, res) => {
        console.log(res);
        return res;
      });
    });
  }
}

module.exports = Manager;
