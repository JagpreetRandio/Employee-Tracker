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
          "Add roles",
          "Add employees",
          "Update employee role",
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
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
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
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "FirstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "LastName"
        },
        {
          type: "input",
          message: "What is the employee's role id number?",
          name: "roleID"
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID"
        }
      ])
      .then(function(answer) {
  
        
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.FirstName, answer.LastName, answer.roleID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  
  //The code for updating the employee inputted by the user 
  
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "Update"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
        db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.Update],function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  
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
  
  function quit() {
    db.end();
    process.exit();
  }
  
