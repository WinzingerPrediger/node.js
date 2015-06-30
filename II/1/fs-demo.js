// var fs = require("fs");
var fs = require("fs-extra");
var file = require("file");
var find = require("find");
var props = require("properties");
var filter = require('token-filter');


var Map = function(defval) {
  var data = new Array();
  var defval = defval;

  this.set = function(key, value) {
    data.push({'key':key, 'value':value});
  }
  this.get = function(key) {
    var retval = defval;
    data.forEach(function(entry) {
      if (entry.key == key) {
        retval = entry.value;
      }
    });
    return retval;
  }
}

var demo_functions = new Map(function() {console.log("function not found")});

demo_functions.set("hello", function(name) {
  console.log("Hello, "+name+"!");
});

demo_functions.set("readfile", function(fname) {
  fs.readFile(fname, function (err, data) {
    if (err) {
      console.log("error reading '"+fname+"': "+err.code);
    } else {
      console.log(data.toString());
    }
  });
});

demo_functions.set("readfilesync", function(fname) {
  try {
    var data = fs.readFileSync(fname);
    console.log(data.toString());
  } catch (err) {
  	console.log("error reading '"+fname+"': "+err.code);
  }
});

demo_functions.set("read", function(fname) {
  fs.open (fname, "r", function(err, fd) {
    if (err) {
      console.log("error opening '"+fname+"': "+err.code);
    } else {
      var buf = new Buffer(15);
      var offset = 0, length = 15, position = 100;
      fs.read(fd, buf, offset, length, position, function (err, numBytes, buf) {
        if (err) {
          console.log("error reading '"+fname+"': "+err.code);
        } else {
          console.log(numBytes+" bytes read");
          console.log(buf.toString());
        }
      });
    }
  });
});

demo_functions.set("stat", function(fname) {
  fs.stat(fname, function (err, stat) {
    if (err) {
      console.log("error reading '"+fname+"': "+err.code);
    } else {
      console.log(stat);
    }
  });
});

demo_functions.set("chmod", function(fname) {
  fs.chmod(fname, 0766, function (err) {
    if (err) {
      console.log("error changing mode for '"+fname+"': "+err.code);
    }
  });
});

demo_functions.set("chown", function(fname) {
  fs.chown(fname, 501, 20, function (err) {
    if (err) {
      console.log("error changing owner '"+fname+"': "+err.code);
    }
  });
});

demo_functions.set("watch", function(fname) {
  fs.watch(fname, function (event, fname) {
  	console.log("file: "+fname+" -> "+event);
  });

  setInterval(function() {
  	console.log(new Date())
  }, 1000);
});

demo_functions.set("copy", function(fnameSrc, fnameDest) {
  fs.copy(fnameSrc, fnameDest, function(name) {
    console.log("file/folder to copy: "+name);
    return true;
  }, function (err) {
    if (err) {
      console.log("error copying '"+fnameSrc+"': "+err.code);
    }
  });
});

demo_functions.set("walk", function(start) {
  file.walk(start, function (err, dirPath, dirs, files) {
  	if (err) {
      console.log("error walking '"+start+"': "+err);
    } else {
      console.log(dirPath+" - "+dirs+" - "+files);
    }
  });
});

demo_functions.set("find", function(pattern, start) {
  find.file(new RegExp(pattern), start, function(files) {
    console.log(files);
  })
});

demo_functions.set("properties", function(fname) {
  var options = {
  	path: true,
  	sections: true,
  	include: true
  }

  props.parse (fname, options, function(err, obj) {
    if (err) {
      console.log("error reading properties: "+err);
    } else {
      console.log (obj);
    }
  });
});

demo_functions.set("filter", function(fname) {
  var tokenValues = {
    ip_cms : "127.0.0.1",
    db_port : "5786"
  }

  fs.createReadStream(fname)
    .pipe(filter(tokenValues))
    .pipe(process.stdout);
});


demo_functions.get(process.argv[2]).apply(this, process.argv.slice(3));