DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("headphones", "electronics", 45.00, 15),
("television", "electronics", 500.01, 20),
("lamp", "lighting", 49.98, 5),
("fan", "electronics", 20.49, 5),
("soap dispenser", "bathroom accessories", 7.99, 125),
("coffee maker", "kitchen", 29.99, 50),
("hydroflask", "kitchen", 14.50, 90),
("latching storage box", "storage", 25.01, 200),
("kindle", "electronics", 129.99, 3),
("sunglasses", "clothing", 39.99, 30);
