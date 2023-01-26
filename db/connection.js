const mysql = require('mysql2');

// Connecting to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // username
      user: 'root',
      //password
      password: '13913989Jlop',
      database: 'employeeTracker'
    },
    console.log('You are now connected to the Employee Tracker database.')
);

module.exports = db;