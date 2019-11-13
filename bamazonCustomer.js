const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table');
 
let table = new Table({
    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
  , colWidths: [10, 30, 30, 10, 20]
});
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

function open() {
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) {
            throw err
        }else {
            
        }
    });
}