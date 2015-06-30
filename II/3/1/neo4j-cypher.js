var query = [
		'START nodeStart=node(1)',
		'MATCH nodeStart-[:knows]-nodeEnd',
		'RETURN nodeStart, nodeEnd'
	].join('\n');

neodb.query( query, {}, function(err, nodes) {
	for( var i in nodes) {
		console.log(
			" rels: ",
			nodes[i].nodeStart._data.data,
			"->",
			nodes[i].nodeEnd._data.data
		);
	}
});

/*
var query = [
		'START nodeStart=node({nodeid})',
		'MATCH nodeStart-[rels:knows]-nodeEnd',
		'RETURN nodeStart, nodeEnd'
	].join('\n');

neodb.query( query, { nodeid: 1 }, function(err, nodes) {
	for( var i in nodes) {
		console.log(
			"   rels: ",
			nodes[i].nodeStart._data.data,
			"->",
			nodes[i].nodeEnd._data.data
		);
	}
});
*/
