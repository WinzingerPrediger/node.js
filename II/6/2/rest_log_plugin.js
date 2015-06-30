function logger(options) {
  if (!options) {
    options = {};
  }
  if (!options.prefix) {
    options.prefix = '[]';
  }
  
  return function log(req, res, next) {
    console.log("["+options.prefix+"] incoming request");
    return next();
  }
}

function serverstats(options) {
  if (!options) {
    options = {};
  }
  if (!options.url) {
    options.url = '/serverstats';
  }
  
  return function providestats(req, res, next) {
    if (req.url === options.url) {
      res.send("some statistics here");
      return next(false);
    }
    return next();
  }
}

// directly exports the function
// -> require('rest_log_plugin').(options);
// module.exports = logger;

// exports an object containing functions
// -> require('rest_log_plugin').logger(options);
// -> require('rest_log_plugin').serverstats(options);
module.exports = {
  logger:logger,
  serverstats:serverstats
};