var greeting = require('./build/Release/greeting');

greeting.sayHello();
console.log("### simple output in native code");

console.log(greeting.returnHello());

console.log("### multiply");
console.log(greeting.mul(2,3, "hallo"));

console.log("### return output from native code");
console.log(greeting.returnNamedHello("node.js"));

console.log("### return output from native code with callback");
greeting.callbackHello(function(retval) {
	console.log("sync callback result: "+retval);
});

console.log("### return output from native code delayed");
console.log(greeting.delayedHello());
console.log("line after delayed (sync).");

console.log("### return output from native code delayed (async)");
greeting.asyncHello(function(retval) {
	console.log("async callback result: "+retval);
	console.log("line before second delayed (sync).");
    console.log("### return output from native code delayed");
	console.log(greeting.delayedHello());
    console.log("line after second delayed (sync).");
    console.log("###");
});
console.log("line after delayed (async)");
console.log("###");
/*
var foo = function() {
  greeting.dumpInfo();
}

greeting.dumpInfo();
foo();
*/