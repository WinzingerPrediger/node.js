mongodb.connect(
	"mongodb://localhost:27017/testdb",
	function( err, db ) {
		var myCustomers		= db.collection("customers");

		myCustomers.find().toArray(
			// ...
		);
	}
);