var crypto = require('crypto');

function HMAC(options) {
    this.options = options;
}

HMAC.prototype.createHash = function createHash(method, url, timestamp) {
    var canonicalForm = method+"#"+url+"#"+timestamp;
  
    console.log("algo  : "+this.options.algorithm);
    console.log("secret: "+this.options.secret);
    
    var hmac = crypto.createHmac(this.options.algorithm, this.options.secret);
    hmac.update(canonicalForm);
    var calculatedHash = hmac.digest("hex");
  
    console.log(canonicalForm+" => "+calculatedHash);
    
    return calculatedHash;
}

HMAC.prototype.verifyRequest = function verifyRequest(req) {
    var clientsideHash = req.headers["hmac"];
    var clientsideTimestamp = req.headers["timestamp"];
  
    var currentTimestamp = Math.round(Math.round(new Date().getTime() / 1000));
    var requestAge = currentTimestamp-clientsideTimestamp;
    
    var calculatedHash = this.createHash(req.method, req.url, clientsideTimestamp);
    console.log(clientsideTimestamp+" <-> "+currentTimestamp+"; diff: "+requestAge);
  
    return ((clientsideHash === calculatedHash) && (Math.abs(requestAge) < 10));
  }
  

module.exports = {
    createHMAC: function createHMAC(options) {

    if (!options)
      options = {};
    if (!options.secret)
      options.secret = 'nodebook-shared-secret';
    if (!options.algorithm)
      options.algorithm = 'sha256';

    return new HMAC(options);
  }
};

