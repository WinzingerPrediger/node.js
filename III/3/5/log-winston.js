var winston = require("winston");
var util    = require("util");

var cart = {
  id: "70aaj90",
  items: -5
}

var CartLogger = winston.transports.CustomerLogger = function (options) {
    this.name = 'CartLogger';
    this.level = options.level || 'warn';
};

util.inherits(CartLogger, winston.Transport);

CartLogger.prototype.log = function (level, msg, meta, callback) {
  // only interested in errors
  if (level === "error") {
    console.error("[CART-LOG] "+msg+" (shopping cart #"+meta.id+" containing "+meta.items+" items)");
  }
};

var cartLogger = new CartLogger({});

winston.log("info", "new cart created", cart);
cartLogger.log("info", "new cart created", cart);

winston.log("error", "illegal shopping cart", cart);
cartLogger.log("error", "illegal shopping cart", cart);


winston.profile("prf1");
winston.profile("prf2");
setTimeout(function() {
  winston.profile("prf1")
}, 1000)
winston.profile("prf2");
