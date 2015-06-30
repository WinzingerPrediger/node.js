var async		= require('async'),
	node1Data	= {name: "Victor"},
	node2Data	= {name: "Charly"},
	nodeData	= [node1Data, node2Data];

async.map(nodeData,
	function(aNodeData, callback) {
		neodb.createNode(aNodeData, function(err, newNode){
			if ( err ) { callback(err); } else {
				console.log(newNode.id + " => " + //...
				callback(null, newNode);
			}
		}); },
	function(err, results) {
		results[0].createRelationshipTo(result[1], "knows", {},
			function(err){
				// ... error handling
			}); }
);
