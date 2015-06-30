// Login
app.post( '/login', function( req, res, next ) {
	// Ausführen des Login
	// ...

	// Setzen von Benutzerdaten an der Session
	req.session.user = {
		name: req.body.username,
		mail: req.body.email
	};

	// Ablegen der Sitzungsdaten
	req.session.save( function(err) {
		if (err)
			return res.status(500).send('Sitzung konnte nicht gespeichert werden!');
		res.send('Alles gut!');
	});
});