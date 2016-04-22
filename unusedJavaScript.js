// check if there is anything in the order array
if (order.length > 0) {

	// use a for loop and if statment to see if the item already exists on the order
	for (var i = 0; i <= order.length-1; i++) {
		if (productID === order[i].id) {
			console.log('true: '+i);
			console.log(productID+' - '+order[1].id);
			// alert the client that they already have that product on their order
			console.log('You already have this product on your order. If you want more of this product please complete this order and start a new one.');				
			orderCapture();

		} else {
			console.log('false: '+i);
			// turn the results into an object
			var lineItem = {
				id: productID,
				qty: qty
			};

			// add the object to the order array
			order.push(lineItem);

			// call the function that asks customer if they want to add more products
			moreItems();

		};
	};

} else {

	// turn the results into an object
	var lineItem = {
		id: productID,
		qty: qty
	};

	// add the object to the order array
	order.push(lineItem);

	// call the function that asks customer if they want to add more products
	moreItems();

};