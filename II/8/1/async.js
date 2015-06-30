var async = require("async");
var fs = require("fs");

var items = [1, 2, 3, 4, 5];

/*
async.map(
  items,
  function(item, callback) {
  	console.log("working on item: "+item);
    callback(null, item*10);
  },
  function(err, results) {
  	console.log("finished: "+results);
  	for (var i=0; i<results.length; i++) {
      console.log(" -> "+results[i]);
  	}
  }
)

async.detectSeries(
  items,
  function(item, callback) {
 	console.log("working on item: "+item);
 	if (item > 3) {
      callback(item);
 	} else {
      callback(false);
 	}
  },
  function(result) {
  	if (result) {
      console.log("one item matches: "+result);
  	} else {
  	  console.log("no item matches");
  	}
  }
)

async.some(['file1','package.json','file3'], fs.exists, function(result){
    console.log("file: "+result);
});
*/

async.detectSeries(
  ["/opt/test.png", "package.json", "/var/test.png"],
  function(file, callback) {
  	console.log("working on file "+file)
    fs.exists(file, function(exists) {
      callback(exists);
    })
  },
  function(result) {
  	console.log("detect-result: "+result)
  }
);

async.some(
  ["package.json", "/opt/test.png", "/var/test.png"],
  function(item, callback) {
  	console.log("working on item "+item)
    fs.exists(item, function(exists) {
      callback(exists);
    })
  },
  function(result) {
  	console.log("some-result: "+result)
    // result contains the first path that exists
  }
);

