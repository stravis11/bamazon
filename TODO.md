## Basic requirements

- [x] Create repo
- [x] Create file structure
- [x] Create bamazon database
  - [x] Create products table
  - [x] Populate database w/ 10 different products
- [x] Create node app bamazonCustomer.js
  - [x] App first displays all items available for sale
  - [x] App prompts user w/ two messages:
    - [x] ID of product they would like to buy
    - [x] How many units of product they would like to buy
  - [x] App checks if store has enough of product to meet request
    - [x] If not enough, Insufficient quantity!, then prevent order from going through
    - [x] If enough to fullfill order
      - [x] Update SQL database to reflect remaining quantity
      - [x] Show customer the total cost of their purchase

## Challenge 2 - Manager View

- [x] Create node app bamazonManager.js
  - [x] Create list of menu options
    - [x] View Product for Sale: List every available item
    - [x] View low inventory: List all items with an inventory count lower than five
    - [x] Add to Inventory: add more of any item currently in the store
    - [ ] Add New Prodcut: Add a compeltely new prodcut to the store

## Challenge 3 - Supervisor View

- [ ] Create a new SQL table called departments

  - [ ] Create tables: department_id, department_name, department_costs
  - [ ] Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

    - [ ] Make sure your app still updates the inventory listed in the products column.

  - [ ] Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
    - [ ] View Product Sales by Department
    - [ ] Create New Department
  - [ ] When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
  - [ ] The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.

## Housekeeping

- [ ] Create README.md. Include videos/gifs of working app.
- [ ] Add bamazon to portfolio
- [ ] Update resume project links
- [ ] Submit portfolio & github links
