// require the mysql npm package
var mysql = require('mysql');
// creates the connection that will connect this file to the mysql database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'Bamazon'
});

// initiates the connection that we created earlier
connection.connect(function(err){
	// if there is an error log it
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	// if not error console.log connected
	console.log('connected as id: ' + connection.threadID);
});

// ============================================================
// create the database
// (only needs to be run once)
// ============================================================
// connection.query('CREATE DATABASE Bamazon;', function(err, res){
// 	// if error throw error.
// 	if (err) throw err;

// 	// print out contents of the response
// 	console.log(res);
// });

// ============================================================
// create the database
// (also only needs to be run once)
// ============================================================

// build the query
// var SQLquery = 'CREATE TABLE Products ('+
// 		'id INT AUTO_INCREMENT PRIMARY KEY, '+
// 		'ProductName VARCHAR(30) NOT NULL, '+
// 		'DepartmentName VARCHAR(30) NOT NULL, '+
// 		'Price DECIMAL(6,2) NOT NULL, '+
// 		'StockQuantity INT NOT NULL'+
// 	')'

// send the request
// connection.query(SQLquery, function(err, res){
// 	// if error throw error.
// 	if (err) throw err;

// 	// print out contents of the response
// 	console.log(res);
// });

// ============================================================
// Add values to the database
// (run whenever products need to be added to the DB)
// ============================================================

// build the query
var SQLquery = 'INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) Values ('+
		'"Baseball Bat", "Sporting Goods", 49.99, 12'+
	'),('+
		'"Baseball Glove", "Sporting Goods", 39.95, 36'+
	'),('+
		'"Full Baseball Uniform Bundle", "Sporting Goods", 70.00, 14'+
	'),('+
		'"Ray-Ban Wayfarer - Black", "Accessories", 119.99, 25'+
	'),('+
		'"Ray-Ban Wayfarer - Tortoise", "Accessories", 119.99, 25'+
	'),('+
		'"Vintage T-shirt", "Clothing", 40.00, 3'+
	'),('+
		'"Lounge Pants", "Clothing", 24.99, 26'+
	'),('+
		'"Diapers", "Baby Supplies", 19.99, 122'+
	'),('+
		'"Passifier", "Baby Supplies", 4.95, 122'+
	'),('+
		'"Snap and Go Stroller and Car Seat Bundle", "Baby Supplies", 449.95, 12'+
	')'

// send the request
connection.query(SQLquery, function(err, res){
	// if error throw error.
	if (err) throw err;

	// print out contents of the response
	console.log(res);
});