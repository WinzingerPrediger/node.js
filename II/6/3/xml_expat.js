var util = require('util');
var fs = require('fs');

var expat = require("node-expat");

var xmlString = fs.readFileSync("node-book.xml").toString();

var parser = new expat.Parser("UTF-8");

var currentAuthorId = null;
var insideFirstname = false;
var insideLastname = false;
var authors = {};
var currentChapterNum = null;
var currentChapterAuthor = null;
var insideChapter = false;
var chapters = {};

parser.addListener('startElement', function(name, attrs) {
    if (name == "nb:author") {
        currentAuthorId = attrs["id"];
        authors[currentAuthorId] = {"fn":"n/a", "ln":"n/a"};
    }
    if (name == "nb:firstname") { 
        insideFirstname = true;
    }
    if (name == "nb:lastname") {
        insideLastname = true;
    }
    if (name == "nb:chapter") {
        currentChapterNum = attrs["num"];
        chapters[currentChapterNum] = {"title":"n/a", "authRef":attrs["authRef"]};
        insideChapter = true;
    }
});

parser.addListener('endElement', function(name) {
    if (name == "nb:author") {
        currentAuthorId = null;
    }
    if (name == "nb:firstname") {
        insideFirstname = false;
    }
    if (name == "nb:lastname") {
        insideLastname = false;
    }
    if (name == "nb:chapter") {
        insideChapter = false;
    }
});

parser.addListener('text', function(value) {
    if ((currentAuthorId != null) && insideFirstname) {
        authors[currentAuthorId].fn = value;
    }
    if ((currentAuthorId != null) && insideLastname) {
        authors[currentAuthorId].ln = value;
    }
    if ((currentChapterNum != null) && insideChapter) {
        chapters[currentChapterNum].title = value;
    }
});

parser.parse(xmlString);

for (chapterNum in chapters) {
    console.log("Chapter #"+chapterNum+" is called '"+chapters[chapterNum].title+"' and was written by "+authors[chapters[chapterNum].authRef].fn+" "+authors[chapters[chapterNum].authRef].ln)
}
