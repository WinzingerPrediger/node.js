var fs = require("fs");
var util = require("util");

function Tupel (a, b, c, d, e, f, g, h, i, j) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.e = e;
	this.f = f;
	this.g = g;
	this.h = h;
	this.i = i;
	this.j = j;
}

function Tupel2 () {
}

function shuffle(arr){ 
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
};

function fillTupel(t) {
	var arr = shuffle(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
	// var arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

	for (var i=0; i<arr.length; i++) {
		t[arr[i]] = arr[i];
	}
    
	return t;
}


var max = 500;
var rep = 1000000;


function doStraighForward() {
	console.log("setting non optimal tupels ...")

	var t = new Array();
	for (var i=0; i<max; i++) {
		/*
		if ((i % 1000) == 0) {
			console.log(i+": "+util.inspect(process.memoryUsage()));
		}
		*/
		t[i] = fillTupel(new Tupel2());
	}

	console.log("done.");
	
	var tmp;

	console.time('reading property - non optimized');
	for (j=0; j<rep; j++) {
		for (i=0; i<max; i++) {
			tmp = t[i].f;
		}
	}
	console.timeEnd('reading property - non optimized');
}

function doOptimzed() {
	console.log("setting optimal tupels ...");

	var t_opt = new Array();
	for (var i=0; i<max; i++) {
		/*
		if ((i % 1000) == 0) {
			console.log(i+": "+util.inspect(process.memoryUsage()));
		}
		*/
		t_opt[i] = new Tupel("a", "b", "c", "d", "e", "f", "g", "h", "i", "j");
	}

	var tmp;
	console.time('reading property - optimized');
	for (j=0; j<rep; j++) {
		for (i=0; i<max; i++) {
			tmp = t_opt[i].f;
		}
	}
	console.timeEnd('reading property - optimized');
}

console.log("max: "+max);
doStraighForward();
doOptimzed();
