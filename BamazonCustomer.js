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
	console.log('connected as id: ' + connection.threadID);
});

