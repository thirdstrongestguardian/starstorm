var assert = require('assert');
var http = require('http');
var starstorm = require('..');
var url = require('url');

describe('app.server - response', function() {
	var app = starstorm();
	var server = app.server();

	before(function () {
		server.init(function (req, res) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write('Hello World');
			res.end();
		});

		server.listen(3000);
	});

	after(function () {
		server.close();
	});

  it('server should return status code 200', function (done) {
		http.get('http://localhost:3000', (res) => {
			assert.equal(res.statusCode, 200);
			done();
		});
	});

	it('server should not return status code 404', function (done) {
		http.get('http://localhost:3000', (res) => {
			assert.notEqual(res.statusCode, 404);
			done();
		});
	});
	
	it('server should return data', function (done) {
		http.get('http://localhost:3000', (res) => {
			res.on('data', function (chunk) {
				assert.equal(chunk, 'Hello World');
				done();
			});
		});
	});
});

describe('app.server - echo url', function() {
	var app = starstorm();
	var server = app.server();

	before(function () {
		server.init(function (req, res) {
			var parsed = url.parse(req.url);

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(parsed.pathname);
			res.end();
		});

		server.listen(3000);
	});

	after(function () {
		server.close();
	});

	it('server should return "/test"', function (done) {
		http.get('http://localhost:3000/test', (res) => {
			res.on('data', function (chunk) {
				assert.equal(chunk, '/test');
				done();
			});
		});
	});
	
	it('server should not return "/echo"', function (done) {
		http.get('http://localhost:3000/test', (res) => {
			res.on('data', function (chunk) {
				assert.notEqual(chunk, '/echo');
				done();
			});
		});
	});
});
