var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var views = require('./routes/views');
var app = express();



var options = {
	origin: true,
	credentials:true,
	methods:['GET', 'PUT', 'POST','DELETE','OPTIONS'],
	allowedHeaders:['X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type', 'Accept','access-control-allow-origin']
};
app.use(cors(options));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/views', views);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
