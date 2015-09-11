var express = require('express');
var router = express.Router();

var config = require('../data/config.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('list', config);
});

module.exports = router;
