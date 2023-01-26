// dependencies needed for developing code
const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql");
const console = require("console.table");
const db = require('./db/connection');

// setting Express app
const PORT = process.env.PORT || 3000;
const app = express();

// Adding middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

