var util = require('util');
var fs = require('fs');

var libxmljs = require("libxmljs");

var xmlString = fs.readFileSync("node-book.xml").toString();
var xmlDoc = libxmljs.parseXml(xmlString);

var xsdString = fs.readFileSync("node-book.xsd").toString();
var xsdDoc = libxmljs.parseXml(xsdString);

if (xmlDoc.validate(xsdDoc) == false) {
    throw new Error("invalid xml!");
}

var authors = {};

var authorElems = xmlDoc.find("//nb:author", {nb: "http://nodebook.de/samples/"});
if (authorElems === undefined) {
    console.log("no elems found");
} else {
    for (i=0; i<authorElems.length; i++) {
        authorElem = authorElems[i];
        
        authorId = authorElem.attr("id").value();
        authors[authorId] = {"fn":"n/a", "ln":"n/a"};
        
        nameElems = authorElem.childNodes();
        
        for (j=0; j<nameElems.length; j++) {
            if (nameElems[j].name() == "firstname") {
                authors[authorId]["fn"] = nameElems[j].text();    
            }
            if (nameElems[j].name() == "lastname") {
                authors[authorId]["ln"] = nameElems[j].text();    
            }
        }
 
        // oder alternativ       
        // authorElem.get("//nb:firstname", {nb: "http://nodebook.de/samples/"}).text();
        // authorElem.get("//nb:lastname", {nb: "http://nodebook.de/samples/"}).text();
    }
    
    var chapterElems = xmlDoc.find("//nb:chapter", {nb: "http://nodebook.de/samples/"});  
    for (i=0; i<chapterElems.length; i++) {
        chapterElem = chapterElems[i];
        
        chapterNum = chapterElem.attr("num").value();
        authorRef = chapterElem.attr("authRef").value();
        chapterTitle = chapterElem.text();
        
        console.log("Chapter #"+chapterNum+" is called '"+chapterTitle+"' and was written by "+authors[authorRef]["fn"]+" "+authors[authorRef]["ln"]);
    }
   
    // schreibender Zugriff
    
    bookElem = xmlDoc.get("//nb:book", {nb: "http://nodebook.de/samples/"});
    
    // isbn ist als String-Attribut im Knoten "book" vorgesehen
    bookElem.attr("isbn", "978-3-00000-000-0");
    if (xmlDoc.validate(xsdDoc) == false) {
        console.log("now invalid xml!");
    } 
    
    // "pages" ist nicht als Kindknoten von "book" vorgesehen
    bookElem.node("nb:pages", "1234");    
    if (xmlDoc.validate(xsdDoc) == false) {
        console.log("now invalid xml!");
    }
    
    xmlDoc = libxmljs.parseXml(xmlDoc.toString());
    
    // ... also wieder entfernen
    pagesElem = xmlDoc.get("//nb:pages", {nb: "http://nodebook.de/samples/"});
    pagesElem.remove();
    if (xmlDoc.validate(xsdDoc) == true) {
        console.log("now valid xml again!");
    }
}
