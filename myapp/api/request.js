var request = require('request');

function api(url, type, data, callback) {
	request({
		method: type,
		url: url
	}, callback)
}

module.exports = api; 