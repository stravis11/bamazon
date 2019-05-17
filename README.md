# bamazon

Bamazon is a node CLI app that simulates purchasing items (bamazonCustomer.js) and managing inventory (bamazonManager.js).

To install the necessary npm packages, cd into the folder and then run:

```
npm install

```

## MySQL

Bamazon requires a MySQL database. Please use the `bamazonSchema.sql` file to create your tables and the `bamazonProducts.sql` file to populate your database with some items.

Create a file named .env, add the following to it, replaced the values with your mySQL database information

```
B_HOST=*yourdbhostname*
DB_USER=*yourdbusername*
DB_PASSWORD=*yourdbpassword*
```

## How to use Bamazon

To start the customer app

```
node bamazonCustomer.js
```

To start the inventory app

```
node bamazonManager.js
```

Video demo of bamazonCustomer.js: [Bamazon Customer Demo](https://)

Video demo of bamazonManager.js: [Bamazon Manager Demo](https://)

GitHub Repo: https://github.com/stravis11/bamazon

## Technologies Used

- JavaScript
- node.js
- MySQL
