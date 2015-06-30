var myCustomers = db.collection( "customers" );

myCustomers.findOne(
	{zip:"80123"},
	{name:1, zip:1, city:1},
	function(err, data) {
		if (err) {
			res.send( 502 );
		} else {
			res.json( data );
		}
	}
);