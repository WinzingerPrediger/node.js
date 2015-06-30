var util = require('util');

function foo() {
	var largeObject = {content:'This is my content'};

	var container1 = { x:largeObject };
	var container2 = { y:largeObject };

	console.log("largeObject: "+largeObject);
	console.log("container1: "+util.inspect(container1));
	console.log("containerw: "+util.inspect(container2));

	console.log("deleting container1.x")
	delete(container1.x);

	console.log("largeObject: "+largeObject);
	console.log("container1: "+util.inspect(container1));
	console.log("containerw: "+util.inspect(container2));
}

foo();