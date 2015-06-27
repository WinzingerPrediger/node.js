var debug = require("debug");

var log = debug("main");

var getName = function() {
  return "World";
}

var getGreeting = function(lang) {
  var greetLog = debug("main:greet");
  var greetWord;

  greetLog("called with param '%s'", lang);

  if (lang === "de") {
    greetWord = "Hallo";
  } else if (lang === "en") {
  	greetWord =" Hello";
  } else {
  	greetWord = "???";
  }

  return greetWord+", "+getName()+"!"
}

log("started application ...");

console.log(">> "+getGreeting("de"));

log("finished application!")