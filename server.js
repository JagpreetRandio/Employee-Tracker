// all dependencies needed to develop code !
const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');

// PORT 
const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
db.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
  
    startScreen();
  });
  
  // All of the prompts shown to the user 
  function startScreen() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "View department",
          "View roles",
          "View employees",
          "Add departments",
          "Add role",
          "Add employee",
          "Update employee role",
          'Remove Employee',
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View department":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
            
            case 'Remove Employee':
          removeEmployee();
          break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }
  
  

  // The code for adding departments when selected by the user 
  function addDepartment() {
  
  
      inquirer.prompt({
        
          type: "input",
          message: "What is the name of the department?",
          name: "deptName"
  
      }).then(function(answer){
  
  
  
          db.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
              if (err) throw err;
              console.table(res)
              startScreen()
      })
      })
  }
  
  
  // The code for adding roles when selected by the user 
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function(answer) {
  
  
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  
  //The code for adding employees when selected by the user 
  function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee."
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter the last name of the employee."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the role id associated with the employee. Enter ONLY numbers."
        },
        {
            name: "manager_id",
            type: "number",
            message: "Please enter the manager's id associated with the employee. Enter ONLY numbers."
        }

    ]).then(function (response) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
            if (err) throw err;
            console.log('The new employee entered has been added successfully to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startPrompt();
                }
                console.table(result);
                startScreen();
            });
        })
});
};
  
  //The code for updating the employee inputted by the user 
  
  function updateEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want update in the database."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the new role number id associated with the employee you want to update in the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');

            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    startScreen();
                }
                console.table(result);
                startScreen();
            });
        })
});
};
  
  // The code for viewing departments when selected by the user 
  function viewDepartment() {
   
    let query = "SELECT * FROM department";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });

  }
  
  // The code for viewing roles when selected by the user 
  function viewRoles() {
    // select from the db
    let query = "SELECT * FROM role";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });

  }
  
  //The code for viewing employees when selected by the user 
  function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
    
  }

  //The code for removing employees when selected by the user 
  function removeEmployee() {
    db.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "rawlist",
          name: "removeEmp",
          message: "Select the employee who will be removed",
          choices: res.map(emp => emp.id && emp.first_name)
        }
      ]).then(function (answer) {
        const selectedEmp = res.find(emp => emp.id && emp.first_name === answer.removeEmp);
        db.query("DELETE FROM employee WHERE ?",
          [{
            id: selectedEmp.id
          }],
          function (err, res) {
            if (err) throw err;
            console.log("The employee has been removed.\n");
            startScreen();
          }
        );
      });
    })
  };
  
  function quit() {
    db.end();
    process.exit();
  }
  
