const inquirer = require('inquirer');

class Inquire {
  constructor(initQs, viewQs, addQs, updateQs, deleteQs) {
    this.initQs = initQs;
    this.viewQs = viewQs;
    this.addQs = addQs;
    this.updateQs = updateQs;
    this.deleteQs = deleteQs;
  }

  async initFlow() {
    const whatToDo = await inquirer.prompt(initQs);
    return whatToDo.initAction;
  }

  async initView() {
    const whatToView = await inquirer.prompt(viewQs.initView);
    return whatToView.viewAction;
  }

  async deptView() {
    const whatDept = await inquirer.prompt(viewQs.deptView);
    return whatDept.deptName;
  }

  async roleView() {
    const whatRole = await inquirer.prompt(viewQs.roleView);
    return whatRole.roleName;
  }

  async employeeView() {
    const whatEmployee = await inquirer.prompt(viewQs.employeeView);
    return whatEmployee.employeeName;
  }

  async managerView() {
    const whatManager = await inquirer.prompt(viewQs.managerView);
    return whatManager.managerName;
  }

  async initAdd() {
    const whatToAdd = await inquirer.prompt(addQs.initAdd);
    return whatToAdd.addAction;
  }

  async deptAdd() {
    const whatDept = await inquirer.prompt(addQs.deptAdd);
    return whatDept.deptName;
  }

  async roleAdd() {
    const whatRole = await inquirer.prompt(addQs.roleAdd);
    return whatRole.roleName;
  }

  async employeeAdd() {
    const whatEmployee = await inquirer.prompt(addQs.employeeAdd);
    return whatEmployee;
  }

  async updateEmployee() {
    const whatEmployee = await inquirer.prompt(updateQs);
    return whatEmployee;
  }

  async initDelete() {
    const whatToDelete = await inquirer.prompt(deleteQs.initDelete);
    return whatToDelete.deleteAction;
  }

  async deptDelete() {
    const whatDept = await inquirer.prompt(deleteQs.deptDelete);
    return whatDept.deptName;
  }

  async roleDelete() {
    const whatRole = await inquirer.prompt(deleteQs.roleDelete);
    return whatRole.roleName;
  }

  async employeeDelete() {
    const whatEmployee = await inquirer.prompt(deleteQs.employeeDelete);
    return whatEmployee.employeeName;
  }
}

const initQs = [
  {
    type: 'list',
    name: 'initAction',
    message: 'What would you like to do?',
    choices: [
      'View departments, roles or employees',
      'Add departments, roles or employees',
      'Update employee role and manager',
      'Delete departments, roles or employees',
      'Get all employees',
    ],
  },
];

const viewQs = {
  initView: [
    {
      type: 'list',
      name: 'viewAction',
      message: 'What would you like to view?',
      choices: [
        'View a department',
        'View a role',
        'View an employee',
        'View employees under a manager',
      ],
    },
  ],
  deptView: [
    {
      type: 'prompt',
      name: 'deptName',
      message: 'What department would you like to view?',
    },
  ],
  roleView: [
    {
      type: 'prompt',
      name: 'roleName',
      message: 'What role would you like to view?',
    },
  ],
  employeeView: [
    {
      type: 'prompt',
      name: 'employeeName',
      message:
        'What employee would you like to view (please provide first and last name)?',
    },
  ],
  managerView: [
    {
      type: 'prompt',
      name: 'managerName',
      message: 'What manager would you like to view?',
    },
  ],
};

const addQs = {
  initAdd: [
    {
      type: 'list',
      name: 'addAction',
      message: 'What would you like to add?',
      choices: ['Add a department', 'Add a role', 'Add an employee'],
    },
  ],
  deptAdd: [
    {
      type: 'prompt',
      name: 'deptName',
      message: 'What department would you like to add?',
    },
  ],
  roleAdd: [
    {
      type: 'prompt',
      name: 'roleName',
      message:
        'What role would you like to add (please provide role name and department ID)?',
    },
  ],
  employeeAdd: [
    {
      type: 'prompt',
      name: 'employeeName',
      message:
        "What is the employee's name? (please provide first name and last name)?",
    },
    {
      type: 'confirm',
      name: 'isManager',
      message: 'Is this employee a manager?',
    },
    {
      type: 'prompt',
      name: 'roleID',
      message: "What is the employee's roleID?",
    },
    {
      type: 'prompt',
      name: 'managerID',
      message: "What is the employee's manager's ID?",
    },
  ],
};

const updateQs = [
  {
    type: 'prompt',
    name: 'employeeName',
    message:
      'What employee would you like to update (please provide first name and last name?',
  },
  {
    type: 'confirm',
    name: 'isManager',
    message: 'Is this employee a manager?',
  },
  {
    type: 'prompt',
    name: 'roleID',
    message: "What is the new employee's roleID?",
  },
  {
    type: 'prompt',
    name: 'managerID',
    message: "What is the employee's new manager's ID?",
  },
];

const deleteQs = {
  initDelete: [
    {
      type: 'list',
      name: 'deleteAction',
      message: 'What would you like to delete?',
      choices: ['Delete a department', 'Delete a role', 'Delete an employee'],
    },
  ],
  deptDelete: [
    {
      type: 'prompt',
      name: 'deptName',
      message: 'What department would you like to delete?',
    },
  ],
  roleDelete: [
    {
      type: 'prompt',
      name: 'roleName',
      message: 'What role would you like to delete?',
    },
  ],
  employeeDelete: [
    {
      type: 'prompt',
      name: 'employeeName',
      message: `What employee would you like to delete (please provide first and last name)?\n
        (note: if this employee is a manager, be sure to update the managerIDs of all those\n
          who report to them. You can do this by updating the roles of each employee)`,
    },
  ],
};

const myInquirer = new Inquire(initQs, viewQs, addQs, updateQs, deleteQs);

module.exports = myInquirer;
