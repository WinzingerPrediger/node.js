var swig = require('swig');

app.engine( 'html', swig.renderFile );
app.engine( 'json', swig.renderFile );

app.set( 'view engine', 'html' );
app.set( 'view engine', 'json' );
app.set( 'views', __dirname + '/views' );

￼app.get("/", function( req, res) {
	res.render( "index", { title: "Hello, World!" } );
});