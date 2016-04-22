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
	beginManager();
});

// ============================================================
// Universal Variables to hold data
// ============================================================


// ============================================================
// Function to begin process
// ============================================================

function beginManager(){
	console.log('=============================================');
	console.log('             Manager Functions');
	console.log('=============================================\n');
	console.log('1 - View Products for Sale');
	console.log('2 - View Low Inventory');
	console.log('3 - Add to Inventory');
	console.log('4 - Add New Product\n');

	chooseFunction();
};

function chooseFunction(){

	var schema = {
		properties: {
			option: {
				description: 'Which function would you like to choose?',
				required: true
			}
		}
	};

	// ask the question to see if they want more products
	prompt.get(schema, function(err,res){

		// turn the answer into a variable
		var option = res.option;

		// check to see if the answer is a string of y or n
		switch(option) {
			case '1':
				viewProducts();
				break;
			case '2':
				viewLowInventory();
				break;
			case '3':
				addInventory();
				break;
			case '4':
				addNewProduct();
				break;
			default:
				console.log('That is not a valid action. Please try again.');
				chooseFunction();
		};
	});
};

function viewProducts(){
	console.log('You chose: View Products');
};

function viewLowInventory(){
	console.log('You chose: View Low Inventory');
};

function addInventory(){
	console.log('You chose: Add Inventory');
};

function addNewProduct(){
	console.log('You chose: Add New Product');
};


