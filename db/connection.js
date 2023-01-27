const mysql = require('mysql2');

// Connecting to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // username
      user: 'root',
      //password
      password: '1293369Salad.',
      database: 'employeeTracker'
    },
    console.log('You are now connected to the Employee Tracker database.')
);

module.exports = db;