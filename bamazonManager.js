require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table3");
const {
  env: { DB_HOST, DB_USER, DB_PASSWORD }
} = process;

// create the connection information for the sql database
const db = mysql.createConnection({
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

// connect to the mysql server and database
db.connect(err => {
  if (err) throw err;
  // run the listItems function after the connection is made
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "menuChoice",
        type: "list",
        message: "Please select an option",
        choices: [
          { name: "View Products for Sale", value: "viewprod" },
          { name: "View Low Inventory", value: "viewlow" },
          { name: "Add to Inventory", value: "addinv" },
          { name: "Add New Product", value: "addprod" },
          { name: "Exit", value: "end" }
        ]
      }
    ])

    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menuChoice === "viewprod") {
        viewProd();
      } else if (answer.menuChoice === "viewlow") {
        viewLowInv();
      } else if (answer.menuChoice === "addinv") {
        addInv();
      } else if (answer.menuChoice === "addprod") {
        addProd();
      } else {
        db.end();
      }
    });
}

function viewProd() {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) throw err;
    // build and display table of products
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
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });

  setTimeout(start, 500);
}

function viewLowInv() {
  console.log("View low inventory");
}

function addInv() {
  console.log("Add inventory");
}

function addProd() {
  console.log("Add product");
}
