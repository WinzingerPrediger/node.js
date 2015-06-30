var Readable = require("stream").Readable;
var Writable = require("stream").Writable;
var Transform = require("stream").Transform;

// RandomierStream

// constructor
function RandomizerStream(options) {
  if (!options) {
    options = {};
  }
  if (!options.lower) {
    options.lower = 1;
  }
  if (!options.upper) {
    options.upper = 100;
  }

  if (options.upper > 255) {
    throw new Error("only randoms up to 255 supported");
  }

  this.lower = options.lower;
  this.upper = options.upper;

  // call super constructor for providing options
  Readable.call(this, options);
}

// prototype
RandomizerStream.prototype = Object.create(
  Readable.prototype, { constructor: { value: RandomizerStream }});

// override default implementation of_read
RandomizerStream.prototype._read = function(n) {
  var buffer = new Buffer(n);
  var lastVal = -1;
  var alreadyEmittedWarning = false;

  for (i=0; i<n; i++) {
    var newVal = Math.floor((Math.random()*(this.upper-this.lower)))+this.lower;
    if ((lastVal != -1) && (lastVal == newVal)) {
      if (alreadyEmittedWarning) {
        this.push(buffer);
        this.push(null);
        return;
      }
      this.emit("warning", "generated "+lastVal+" two times in a row");
      // alreadyEmittedWarning = true;
    } else {
      alreadyEmittedWarning = false;
    }

    buffer.writeUInt8(newVal, i);
    lastVal = newVal;
  }
  this.push(buffer);
  console.log("created "+n+" randoms ...");
}

// DevNullStream

function DevNullStream(options) {
  if (!options) {
    options = {};
  }
  if (!options.overwriteCount) {
    options.overwriteCount = 1;
  }

  this.overwriteCount = options.overwriteCount;
  this.callCount = 0;

  // call super constructor for providing options
  Writable.call(this, options);
}

// prototype
DevNullStream.prototype = Object.create(
  Writable.prototype, { constructor: { value: DevNullStream }});

// override default implementation of_transform
DevNullStream.prototype._write = function(buffer, encoding, callback) {
  this.callCount++;

  console.log("received data, package #"+this.callCount+", "+buffer.length+" bytes");

  if (this.callCount % 10 == 0) {
    // I need a break ...
    console.log("oh, wait ...");
    setTimeout(function() {
      console.log("ok, let's go on");
      callback();
    }, 2000);
  } else {
    callback();
  } 
}

// Supercrypto

// constructor
function SupercryptoStream(options) {
  if (!options) {
    options = {};
  }
  if (!options.rotate) {
    options.rotate = 0;
  }

  this.rotate = options.rotate % 26;
  this.checksum = 0;

  // call super constructor for providing options
  Transform.call(this, options);
}

// prototype
SupercryptoStream.prototype = Object.create(
  Transform.prototype, { constructor: { value: SupercryptoStream }});

// override default implementation of_transform
SupercryptoStream.prototype._transform = function(buffer, encoding, callback) {
  var plaintext = buffer.toString("utf8");
  var encrypted = "";
  for (i=0; i<plaintext.length; i++) {
    var charCode = plaintext.charCodeAt(i);
    var encryptedCharCode = charCode;
    if (charCode >= 65 && charCode <= 91) {
      encryptedCharCode = (plaintext.charCodeAt(i)-65+this.rotate)%26+65;
    } else if (charCode >= 97 && charCode <= 123) {
      encryptedCharCode = (plaintext.charCodeAt(i)-97+this.rotate)%26+97;
    } 
    encrypted += String.fromCharCode(encryptedCharCode);
    this.checksum = (this.checksum + encryptedCharCode) % 100;
  }
  this.push(encrypted);
  callback();
}

SupercryptoStream.prototype._flush = function(callback) {
  this.push("::"+this.checksum);
  callback();
}

// convenience methods for creating streams
var _createRandomizerStream = function (options) {
  return new RandomizerStream(options);
};

var _createDevNullStream = function (options) {
  return new DevNullStream(options);
};

var _createSupercryptoStream = function (options) {
  return new SupercryptoStream(options);
};


// define exported functions
module.exports = {
  createRandomizerStream  : _createRandomizerStream,
  createDevNullStream     : _createDevNullStream,
  createSupercryptoStream : _createSupercryptoStream
};