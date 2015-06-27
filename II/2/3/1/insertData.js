var util = require('util');
var neo4j = require('neo4j');

var neodb = new neo4j.GraphDatabase('http://localhost:7474');

/*
var node_data = {labels:["Author"], name: "Ralph"};

neodb.createNode(node_data).save(function(err, newNode) {
  // ... error handling
  console.log(newNode.id + " => "
    + util.inspect(newNode.data, false, 2));
});
*/

neodb.getNodeById(3, function(err, authorNode) {
  console.log(authorNode.id + " => "
    + util.inspect(authorNode.data, false, 3));
})
