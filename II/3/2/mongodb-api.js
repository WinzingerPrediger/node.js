var MongoClient	= require("mongodb").MongoClient,
	Server		= require("mongodb").Server,

	mongodb		= new MongoClient(
						new Server("localhost", 27017 ),
						{w:'majority'}
					);
