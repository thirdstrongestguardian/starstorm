var assert = require('assert');
var starstorm = require('..');

describe('app', function() {
  it('should be callable', function () {
		var app = starstorm();
		assert.equal(typeof app, 'function');
	});
});
