# Test Modul

Dieses Modul zeigt lediglich, wie man in Node.js Module programmieren sollte.

## Verwendung

Nachfolgende Code-Beispiele verdeutlichen die Einbindung des Moduls in eigene Anwendungen.

    var bm = require('bookmod');

    var options = {
      'foo':'bar',
      'abc':18773
    };    
    bm.init(options);

    bm.doSomething();
    bm.doSomethingElse();

## Historie

### 0.0.1

Initiale Version

### 0.0.2

Existiert noch nicht
