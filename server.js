var express = require('express'),
  app = express(),
  conf = require('./convict.conf.js');

console.log(conf.get('env'));

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(express.static(__dirname + '/dist'));


app.listen(conf.get('port'));