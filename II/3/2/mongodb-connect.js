var mongodb = require("mongodb").MongoClient;

mongodb.connect(
	"mongodb://localhost:27017/testdb",
	function(err, db) {
		// ...
	}
);
