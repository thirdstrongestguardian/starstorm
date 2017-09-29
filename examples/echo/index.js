var starstorm = require('../..');
var url = require('url');

var app = starstorm();
var server = app.server();

server.init(function (req, res) {
	var parsed = url.parse(req.url);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(parsed.pathname);
	res.end();
});

server.listen(3000);