// synchronous call
output	= swig.render(
			"<p>Hello,{{name}}!</p>",
			{ locals: { name: "World" } }
		);
console.log(output);

// asynchronous call
swig.renderFile(
	"index.html",
	{ locals: { name: "World" } },
	function(err, output) {
		if (err)
			return throw err;
		console.log( output );
	}
);