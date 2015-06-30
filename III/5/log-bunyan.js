var bunyan = require("bunyan"),
    log    = bunyan.createLogger( { name: "testapp" } );

// log.info( "Hallo Welt");
// log.warn( { type: "de"}, "Hallo Welt" );

log.info( { type: "de", type2: "xy", user: { name: "Max", name2: "Mustermann" }, address: { street: "Uferstr. 17", zip: 12345, city: "Musterort" } }, "Hallo Welt" );