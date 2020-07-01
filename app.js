const mysql = require('mysql2');
const inquirer = require('inquirer');
const Employee = require('./assets/js/Employee');
const Manager = require('./assets/js/Manager');
const Department = require('./assets/js/Department');
const Role = require('./assets/js/Role');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'macDATAbase!6799',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected as id ' + connection.threadId);
  initUI();
});

async function initUI() {
  const employee = new Employee('Jack', 'Donahue', 9, 3);
  // employee.add();
  // employee.updateRole(5, 6);
  // employee.getByName();
  // employee.delete();
  // employee.getByName();
  // employee.getAllEmployees();

  const manager = new Manager('Jane', 'Doe', 2, 1);
  // manager.getByName();
  // manager.getAllUnder();

  const department = new Department('Sales');
  department.getAllUnder();
  // department.delete();
  // department.getAllUnder();
  department.getBudget();

  const role = new Role('Business Development', 70000.0, 2);
  // role.add();
  // employee.add();
  // role.getAllUnder();
  // role.delete();
  // role.getAllUnder();
}
