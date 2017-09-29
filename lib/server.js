const http = require('http');

module.exports = function () {
	var init, listen, close;

	init = function (callback) {
		this.server = http.createServer(function (req, res) {
			if (typeof callback === 'function') {
				callback(req, res);
				return;
			}

			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end();
		});
	};
	
	listen = function () {
		this.server.listen.apply(this.server, arguments);
	};
	
	close = function (callback) {
		this.server.close(callback);
	};
	
	return {
		close: close,
		init: init,
		listen: listen
	};
};
