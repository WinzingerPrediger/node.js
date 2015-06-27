var max = 1000000;

var arr = new Array();
for (i=0; i<max; i++) {
	arr[i] = i;
}

console.time("add integer");
arr[max] = max;
console.timeEnd("add integer");

console.time("add object");
arr[max+1] = true;
console.timeEnd("add object");
