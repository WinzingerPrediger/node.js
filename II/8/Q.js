￼ // fetch data from server
function getData(url) {
	// create a „deferred“ object
	var def = Q.defer();

	// now, initiate data retrieval
	$.getJSON( url, function(data) {
		// as soon as the data will be available
		// put it into the deferred object
		def.resolve(data);
	});

	// immediately return a promise to the caller
	return def.promise;
}

Q
	.when( getData("/data/customer/read") )  // initiate async. logic
	.then( function(data) {                  // if data is available
		$("body").html(data);                // change DOM tree
	});


/*
// fetch data from server
function getData(url) {
	// create a „deferred“ object
	var def = Q.defer();

	// now, initiate data retrieval
	$.getJSON(url, function(data) {
		// as soon as the data will be available
		// put it into the deferred object
		def.resolve(data);
	}).fail( function(xhr, status, error) {
		// in case of an error, pass
		// the error msg to the caller
		def.reject(error.message);
	});

	// immediately return a promise to the caller
	return def.promise;
}

Q
	.when(getData("/data/customer/read"))
	.then(function(data) {
		return getData("/data/order/read?custid=" + data.custid);
	})
	.then(function(data) {
		$("body").html(data);
	})
	.fin(function() {
		// ... „finalize“
	});
*/
