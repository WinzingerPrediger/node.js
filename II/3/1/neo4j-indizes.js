node.index( "betriebsstellen", "name", betriebsstellenName,
	function(err, result) {
		if (err) {
			// ...
		}
	}
);

/*
neodb.getIndexedNode( "betriebsstellen", "name", betriebsstellenName,
	function(err, result) {
		// ...
	}
);
*/

/*
var query = [
		'START nodeStart=node:betriebsstellen(name = {betriebsstellenName})',
		'MATCH nodeStart-[:streckenAbschnitt]->nodeEnd',
		'RETURN nodeStart, nodeEnd'
	].join('\n');

neodb.query(query, {betriebsstellenName: betriebsstellenName},
	function(err, nodes) {
		console.log(util.inspect(nodes, false, 2));
	}
);
*/
