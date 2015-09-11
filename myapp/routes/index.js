var express = require('express');
var router = express.Router();

// var _ = require('lodash');

var api = require('../api/request');

// data 数据
// var config = require('../data/config.json');
// var user = require('../data/user.json');
// var account = require('../data/account.json');
// var list = require('../data/list.json');

// var userData = getUserData(user, account);
// var listData = list.data.slice(0, 8);

// var data = _.assign(config, userData, {list: listData});

/* GET home page. */
router.get('/', function(req, res, next) {
	// 获取接口数据
	api('http://localhost:3000/api/list', 'get', {}, function(error, response, body){
		if (!error && response.statusCode == 200) {
			res.render('index', JSON.parse(response.body));
		}else{
			next()
		}
	})
  //res.render('index', data);
});


// function getUserData(a, b){
// 	var d = b[a["uid"]];
// 	if(d) {
// 		for(var i in d) {
// 			a[i] = d[i];
// 		}
// 	} 
		
// 	return a;
// }

module.exports = router;
