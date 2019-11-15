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
    table = new Table({
        head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity']
        , colWidths: [10, 30, 30, 10, 20]});
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) {
            throw err
        } else {
            let id = []
            for (let i = 0; i < response.length; i++) {
                table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price.toFixed(2), response[i].stock_quantity]);
                id.push(response[i].item_id);
            }
            console.log(table.toString());
            customerChoice(id)
        }
    });
};

function customerChoice(idArray) {
    inquirer.prompt([{
        type: 'list',
        name: 'customerSelectedID',
        message: 'Make your selection from the following items:',
        choices: idArray
    },
    {
        type: 'input',
        name: 'customerAmount',
        message: 'Input amount desired:'
    }])
        .then(function (response) {
            console.log('customerSelectedID: ' + response.customerSelectedID)
            console.log('customerAmount: ' + response.customerAmount)
            checkQuantity(response.customerSelectedID, response.customerAmount)
            
        });
};

function checkQuantity(itemID, amount) {
    connection.query('SELECT * FROM products WHERE ?', {item_id:itemID}, function (err, response) {
        if (err) {
            throw err
        } else if (response[0].stock_quantity >= parseInt(amount)) {
            let newAmount = response[0].stock_quantity - parseInt(amount)
            let purchasedAmount = parseInt(amount)
            updateAmount(itemID, newAmount, purchasedAmount, response[0].price)
        }else {
            console.log('Insufficient quantity!!')
            open()
        }
    });
};

function updateAmount(itemID, appleAmount, purchasedAmount, price) {
    connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity:appleAmount}, {item_id:itemID},], function (err, response) {
        if (err) {
            throw err
        }else {
            let salesTotal = price * purchasedAmount
            console.log('Price: ' + price + ' purchaseAmount: ' + purchasedAmount)
            console.log('Thank you. The total cost of your purchase is: $' + salesTotal.toFixed(2))
            open()
        }
    });
} ;

open();