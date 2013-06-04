var express = require('express'),
  app = express(),
  conf = require('./convict.conf.js');

app.use(express.static(__dirname + '/dist'));
app.use(express.cookieParser());
app.use(express.cookieParser({secret: conf.get('sessionSecret')}));

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

console.log('starting', conf.get('port'))




app.listen(conf.get('port'));