var coll 	= db.collection("cust");

/*
coll.update(
	{ name: "Mustermann" },
	{
 		name: 		"Mustermann",
		vorname:	"Günther"
	},
	{upsert:true, safe:true},
	function(err, result) {
		// ...
	}
);
*/

coll.update(
	{ name:"Mustermann" },
	{
		$set:	{
			vorname:"Günther"
		}
	},
	{ upsert: true, safe: true },
	function(err, result) {
		// ...
	}
);