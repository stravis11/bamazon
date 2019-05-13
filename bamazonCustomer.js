require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");
var {
  env: { DB_HOST, DB_USER, DB_PASSWORD }
} = process;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: DB_HOST,

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: DB_USER,

  // Your password
  password: DB_PASSWORD,
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// query the database & display all items in a table
function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    var table = new Table({
      style: { head: ["cyan"] },
      head: [
        "Item ID",
        "Product Name",
        "Department Name",
        "Price",
        "# in Stock"
      ],
      colWidths: [10, 20, 20, 15, 15]
    });
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].item_id,
        results[i].product_name,
        results[i].department_name,
        "$" + results[i].price,
        "$" + results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });
  connection.end();
}
