var app = require('express')(),
  swig = require('swig'),
  people;

/*
// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.engine('', swig.renderFile);

app.set('view engine', 'html');
app.set('view engine', '');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

fantasyAgeValues = [ 
  { age: 32, name: "Robert" }, 
  { age: 41, name: "Charly" },
  { age: 32, name: "Victor" },
  { age: 35, name: "Ralph" }
 ] 

days = ["Monday", "Tuesday", "Wednesday"]

taggedString = "<p>foo</p><bar>baz</bar><aaa><bb/>Hello"

urlValue = "This is 100% not URL compatible [I guess]"

var param = {
  name         : "Hello, World!",
  countWords   : function(text) {
                   return text.split(" ").length;
                 },
  ageValues    : fantasyAgeValues,
  days         : days,
  taggedString : taggedString,
  urlValue     : urlValue
};

app.get('/', function (req, res) {
  res.render('index.html', param);
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');

*/
/*


var swig = require('swig');

var param = {
  now: new Date(),
  greeting: "Hello, World!",
  timestamp: function() {
                return "<"+new Date()+">";
              },
  timestamp2: function() {
                return new Date();
              }
};

// console.log(swig.render('{{ greeting|reverse }} - {{ timestamp()|escape }}', {locals: param} ));

console.log(swig.render('{{ "<blah>"|escape }}'));

// console.log(swig.render('{{ now|date( "Y-m-d" ) }}', {locals: param} ));
*/

// output = swig.render("<p>Hello,{{name}}!</p>", {locals:{name: "World"}});
// console.log(output)

swig.setFilter("log", function(input, level) {
	console.log(level+": "+input)
	return input
})

var helloTemplate = swig.compile("<p>Hello, {{name|log('DBG')}}!</p>");
var output = helloTemplate({name: "World"});
console.log(output)

