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
  listItems();
});

// query the database & display all items in a table
function listItems() {
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
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });

  setTimeout(buyProduct, 500);
}

function buyProduct() {
  // prompt the user for which they'd like to buy
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Enter the ID of the product you would like to buy: ",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        }
      }
    ])
    .then(function(input) {
      var item = input.item_id;
      var quantity = input.quantity;

      // query the database for all items being sold & prompt user for product & quantity to buy
      var queryDb = "SELECT * FROM products WHERE ?";
      connection.query(queryDb, { item_id: item }, function(err, results) {
        if (err) throw err;
        // Check if valid item ID was entered
        if (results.length === 0) {
          console.log("Invalid Item ID. Please enter a valid Item ID.");
          listItems();
        } else {
          var productData = results[0];
          // Check if product is in stock
          if (quantity <= productData.stock_quantity) {
            console.log("We have that in stock! Placing your order.");

            //Update stock quantity in database
            var UpdateQuery =
              "UPDATE products SET stock_quantity = " +
              (productData.stock_quantity - quantity) +
              " WHERE item_id = " +
              item;
            connection.query(UpdateQuery, function(err, results) {
              if (err) throw err;
              console.log(
                "Order complete. Your total is $" + productData.price * quantity
              );
              console.log("Thanks for shopping at Bamazon!");
              console.log(
                "\n---------------------------------------------------------------------\n"
              );
              connection.end();
              return;
            });
          } else {
            console.log(
              "Sorry, there is not enough of that product in stock. Please try again."
            );
            listItems();
          }
        }
      });
    });
}
