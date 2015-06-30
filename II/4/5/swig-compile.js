// first, compile the template
var helloTemplate = swig.compile( "<p>Hello, {{name}}!</p>" );

// now render the output
var output = helloTemplate( {name: "World"} );
console.log(output);
