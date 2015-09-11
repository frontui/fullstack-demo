var express = require('express');
var router = express.Router();

var _ = require('lodash');

// data 数据
var config = require('../data/config.json');
var user = require('../data/user.json');
var account = require('../data/account.json');
var list = require('../data/list.json');

var userData = getUserData(user, account);
var listData = list.data.slice(0, 8);

var data = _.assign(config, userData, {list: listData});

/* GET users listing. */
router.get('/list', function(req, res, next) {
  //res.send('respond with a resource');
  res.json(data)
});

router.get('/list/id/:id', function(req, res, next){
	var list = data.list;
	var collection = _.filter(list, function(item){
		return item.id == req.params.id;
	})
	res.json(collection[0])
})

function getUserData(a, b){
	var d = b[a["uid"]];
	if(d) {
		for(var i in d) {
			a[i] = d[i];
		}
	} 
		
	return a;
}

module.exports = router;
