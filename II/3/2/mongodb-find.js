mongodb.connect(
	"mongodb://localhost:27017/testdb",
	function( err, db ) {
		var myCustomers = db.collection("customers");

		myCustomers.find(
			{zip: "80123"},
			{name: 1, zip: 1, city: 1},
			{sort: {name: 1}, skip: 100, limit: 50}
		).toArray(function (err, data) {
			if (err) {
				res.send(502);
			} else {
				res.json(data);
			}
		});
	}
);