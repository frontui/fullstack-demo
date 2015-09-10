var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// nujucks模板
var nunjucks = require('nunjucks');
var number = require('lang-js-number');

var config = require('./data/config.json');
var routes = require('./routes/index');
var list = require('./routes/list');

var app = express();

// filter
var env = nunjucks.configure('views', {
	//autoscape: true,
	express: app
});

env.addFilter('numberFormat', function(str){
	return number.decimal.en(str);
})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/list', list);
// 代理除了demo以外模板
app.use(/^(.*)\.html$/,function(req, res, next) {
	var fileName = req.params[0];
	var filePath = path.join(__dirname, 'views');
	fileName = fileName.replace(/\//g, '');
	var file = filePath +'\\' + fileName + '.html';
	fs.exists(file, function(exists){
		if(exists) {
			res.render(fileName, config);
		} else {
			next();
		}
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
