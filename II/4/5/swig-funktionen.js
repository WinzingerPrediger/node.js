var swig 	= require('swig'),
	param 	= {
		greeting:	"Hello, World!",
		timestamp:	function() {
			return "<"+new Date()+">";
		}
	};

console.log(
	swig.render('{{ greeting }} - {{ timestamp() }}',
	{locals: param} )
);
