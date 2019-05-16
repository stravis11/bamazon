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
  // run the start function after the connection is made
  start();
});
// funtion displays menu of choices
function start() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Please select an option",
        choices: [
          "View Inventory",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ]
      }
    ])
    .then(function(answer) {
      // based on selection, call the appropriate function
      switch (answer.choice) {
        case "View Inventory":
          viewInv();
          break;
        case "View Low Inventory":
          viewLowInv();
          break;
        case "Add to Inventory":
          addInv();
          break;
        case "Add New Product":
          addProd();
          break;
        case "Exit":
          db.end();
      }
    });
}

// function displays all items in inventory
function viewInv() {
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

// function displays only products with quantity less than 5
function viewLowInv() {
  db.query(
    "SELECT * FROM products WHERE stock_quantity < 5",
    (err, results) => {
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
    }
  );

  setTimeout(start, 500);
}

// function increases quantity of an item
function addInv() {
  // prompt for product ID and quantity
  inquirer
    .prompt([
      {
        type: "input",
        message: "ID # of item:",
        name: "id",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        }
      },
      {
        type: "input",
        message: "Quantity to add?",
        name: "quantity",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        }
      }
    ])
    .then(function(item) {
      db.query(
        "SELECT * FROM products WHERE ?",
        { item_id: item.id },
        (err, results) => {
          if (err) throw err;
          let product = results[0];
          console.log(`You selected ${product.product_name}`);
          if (product.stock_quantity <= 0) {
            console.log("Insufficient quantity");
            start();
          } else {
            let newQuantity = product.stock_quantity + item.quantity;
            db.query(
              "UPDATE products SET ? WHERE ?",
              [{ stock_quantity: newQuantity }, { item_id: item.id }],
              function(err, results) {
                if (err) throw err;
                console.log("Inventory restock successful\n");
                console.log(
                  `There are now ${newQuantity} ${
                    product.product_name
                  }'s in the inventory.`
                );
                start();
              }
            );
          }
        }
      );
    });
}

// function adds a new product
function addProd() {
  console.log("Add product");
}
