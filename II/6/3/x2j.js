var util = require('util');
var fs = require('fs');

var xml = fs.readFileSync("simple.xml").toString();

console.log("XML: "+xml);

var dump = function(name, jsonObj) {
  console.log("\n### "+name+" ###")
  console.log(util.inspect(jsonObj, true, 10));  
}

// xml2json

var xj = require('xml2json');
dump("xml2json", JSON.parse(xj.toJson(xml)))

// dom-js

var DomJS = require("dom-js").DomJS;
var domjs = new DomJS();
domjs.parse(xml, function(err, dom) {
    dump("dom-js", dom);
});

// libxmljs

var libxmljs = require("libxmljs");
dump("libxmljs", libxmljs.parseXml(xml));

