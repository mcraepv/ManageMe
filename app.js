const mysql = require('mysql2');
const myInquirer = require('./assets/js/Inquire');
const figlet = require('figlet');
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
  figlet.text(
    'ManageMe!',
    {
      font: 'univers',
    },
    (err, data) => {
      if (err) throw err;
      console.log(data);
      initUI();
    }
  );
});

async function initUI() {
  const universalEmployee = new Employee('', '', 0, 0);
  const universalManager = new Manager('', '', 0, 0);
  const universalDepartment = new Department('');
  const universalRole = new Role('', 0, 0);

  const action = await myInquirer.initFlow();
  console.log(action);
  switch (action) {
    case 'View departments, roles or employees':
      initView();
      break;
    case 'Add departments, roles or employees':
      initAdd();
      break;
    case 'Update employee role and manager':
      initUpdate();
      break;
    case 'Delete departments, roles or employees':
      initDelete();
      break;
    case 'Get all employees':
      universalEmployee.getAllEmployees();
      setTimeout(() => {
        initUI();
      }, 1000);
      break;
  }

  async function initView() {
    const viewAction = await myInquirer.initView();
    switch (viewAction) {
      case 'View a department':
        const deptName = await myInquirer.deptView();
        universalDepartment.getAllUnder(deptName);
        universalDepartment.getBudget(deptName);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'View a role':
        const title = await myInquirer.roleView();
        universalRole.getAllUnder(title);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'View an employee':
        const employeeName = await myInquirer.employeeView();
        const [firstEmplName, lastEmplName] = employeeName.split(' ');
        universalEmployee.getByName(firstEmplName, lastEmplName);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'View employees under a manager':
        const managerName = await myInquirer.managerView();
        const [firstManagerName, lastManagerName] = managerName.split(' ');
        universalManager.getAllUnder(firstManagerName, lastManagerName);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
    }
  }

  async function initAdd() {
    const addAction = await myInquirer.initAdd();
    switch (addAction) {
      case 'Add a department':
        const deptName = await myInquirer.deptAdd();
        universalDepartment.add(deptName);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'Add a role':
        const roleData = await myInquirer.roleAdd();
        const { roleName, roleSalary, deptID } = roleData;
        universalRole.add(roleName, parseInt(roleSalary), parseInt(deptID));
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'Add an employee':
        const employeeData = await myInquirer.employeeAdd();
        const { employeeName, roleID, managerID } = employeeData;
        const [firstName, lastName] = employeeName.split(' ');
        universalEmployee.add(firstName, lastName, roleID, managerID);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
    }
  }

  async function initUpdate() {
    const whatEmployee = await myInquirer.updateEmployee();
    const { employeeName, roleID, managerID } = whatEmployee;
    const [firstName, lastName] = employeeName.split(' ');
    universalEmployee.updateRole(roleID, managerID, firstName, lastName);
    setTimeout(() => {
      initUI();
    }, 1000);
  }

  async function initDelete() {
    const deleteAction = await myInquirer.initDelete();
    switch (deleteAction) {
      case 'Delete a department':
        const whatDept = await myInquirer.deptDelete();
        universalDepartment.delete(whatDept);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'Delete a role':
        const whatRole = await myInquirer.roleDelete();
        universalRole.delete(whatRole);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
      case 'Delete an employee':
        const employeeName = await myInquirer.employeeDelete();
        const [firstName, lastName] = employeeName.split(' ');
        universalEmployee.delete(firstName, lastName);
        setTimeout(() => {
          initUI();
        }, 1000);
        break;
    }
  }
}
