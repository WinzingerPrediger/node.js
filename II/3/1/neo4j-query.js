neodb.getNodeById( 1, function(err, node) {
	node.getRelationships(null, function(err, rels){
		console.log(" rels[0]: "
			+ util.inspect( rels[0].start.data, false, 2 )
			+ " --> "
			+ util.inspect( rels[0].end.data, false, 2 )
		);
	});
});

/*
neodb.getNode( rels[0].end._data.self, function(err, relNode) {
	console.log(" rels[0]: "
		+ util.inspect( rels[0].start.data, false, 2 )
		+ " --> "
		+ util.inspect( relNode.data, false, 2 )
	);
});
*/
