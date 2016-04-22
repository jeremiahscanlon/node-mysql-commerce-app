// require the prompt package
var prompt = require('prompt');
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
	console.log('connected as id: ' + connection.threadId);
});

// ============================================================
// Universal Variables to hold data
// ============================================================
var order = [];
var currentOrderNumber;
var orderQty = '';
var orderID = '';

// ============================================================
// Get all Products from MySQL
// ============================================================

// create function for prompt to be used later
function orderCapture(){

	// create a schema for the prompt, so we can enter a more complete questions.
	var schema = {
		properties: {
			product: {
				description: 'Please choose a product by entering it\'s line number',
				required: true
			},
			qty:{
				description: 'How many would you like to order?',
				required: true
			}
		}
	};

	// prompt the questions and log the answers
	prompt.get(schema, function(err,res){
		
		// create variables out of the prompted results
		var productID = res.product;
		var qty = res.qty;
		var SQLquery3 = 'SELECT StockQuantity FROM products WHERE id = '+productID;

		connection.query(SQLquery3, function(err, res){
			if (res[0].StockQuantity > qty) {

				var lineItem = {
					id: productID,
					qty: qty
				};

				// add the object to the order array
				order.push(lineItem);

				// call the function that asks customer if they want to add more products
				moreItems();

			} else {

				// let the customer their options.
				console.log('That product does not exist in that qty. Please try a smaller qty or choose a different product.')
				orderCapture();				

			};
		});
	});
};

// create a new function that prompts user to see if they want to add additional items.
function moreItems(){

	// create a schema for the prompt, so we can enter a more complete questions.
	var schema = {
		properties: {
			answer: {
				description: 'Would you like to add more items to your order? (y/n)',
				required: true
			}
		}
	};

	// ask the question to see if they want more products
	prompt.get(schema, function(err,res){

		// turn the answer into a variable
		var answer = res.answer;

		// check to see if the answer is a string of y or n
		if(answer == 'y' || answer == 'n') {
			if (answer == 'y'){
				// if they want to add more products then run the main prompt again
				orderCapture();
			} else {
				// if they don't want to add more items then just finish the order
				completeOrder();
			}
		} else {
			// if it's not y or n give them a note and restart the prompt, so they can try again.
			console.log('Sorry, we can only understand "y" for Yes or "n" for No. Please try again ...');
			moreItems();
		}
	});
};

function databaseChanges(id, qty){
	var SQLquery4 = 'INSERT INTO Orders (order_id, product_id_fk, qty) Values ('+
						currentOrderNumber+', '+id+', '+qty+
					')';
	connection.query(SQLquery4, function(err, res){
		// if error throw error.
		if (err) throw err;
	});
	connection.query('SELECT StockQuantity FROM products WHERE id = '+id, function(err, res){
		var currentQTY = res[0].StockQuantity;
		var newQTY = currentQTY - qty;
		connection.query('UPDATE Products SET StockQuantity = "'+newQTY+'" WHERE id = '+id, function(err, res){
			// if error throw error.
			if (err) throw err;
		});
	});
	connection.query('SELECT * FROM products', function(err, res){
		// if error throw error.
		if (err) throw err;

		// print out the response as the menu
		for (var i = 0; i < res.length; i++) {
			if (id == res[i].id) {
				console.log(res[i].ProductName +' / '+ res[i].Price +' / '+ qty);
			}
		};
		
	});
}

function completeOrder(){
	console.log('=============================================')
	console.log('Thank you for your order.');



	connection.query('SELECT value FROM config WHERE title = "current_order_number"', function(err, res){
		currentOrderNumber = res[0].value;
		console.log('The order number is: O-'+currentOrderNumber);
		console.log('=============================================\n');
		console.log('PRODUCT NAME  /  PRICE  /  QTY');
		for (var i = 0; i < order.length; i++) {
			orderQty = order[i].qty;
			orderID = order[i].id
			databaseChanges(orderID,orderQty);
		}
		currentOrderNumber++
		connection.query('UPDATE config SET value = "'+currentOrderNumber+'" WHERE title = "current_order_number"', function(err, res){
			// if error throw error.
			if (err) throw err;
		});
	});
};

// ============================================================
// Get all Products from MySQL to start the process
// ============================================================

connection.query('SELECT * FROM products', function(err, res){
	// if error throw error.
	if (err) throw err;

	// print out the response as the menu
	console.log('=============================================')
	console.log('   Product Price and Availabilit y List')
	console.log('=============================================')
	for (var i = 0; i < res.length; i++) {
		console.log(res[i].id +' = '+res[i].ProductName +' / PRICE: '+res[i].Price+' / QTY Availaible: '+res[i].StockQuantity);
	}

	// start the prompt to capture the order
	orderCapture();
	
});