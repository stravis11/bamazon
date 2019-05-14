require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");
var {
  env: { DB_HOST, DB_USER, DB_PASSWORD }
} = process;

// create the connection information for the sql database
var connection = mysql.createConnection({
  // hostname, stored in .env
  host: DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your username, stored in .env
  user: DB_USER,

  // Your password, stored in .env
  password: DB_PASSWORD,
  database: "bamazon"
});
