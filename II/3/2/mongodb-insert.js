var coll = db.collection("customers");

coll.insert(
	{
		_id:		"e272485b-01a8-54a1-e211-a3e792bdde07",
		name:		"Mustermann",
		vorname:	"Günther"
	},
	{safe:true},
	function(err, result) {
		// ...
	}
);
