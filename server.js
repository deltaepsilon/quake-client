var express = require('express'),
  app = express(),
  conf = require('./convict.conf.js'),
  colors = require('colors'),
  fs = require('fs')
  quiverAuth = require('quiver-auth'),
  quake = require('quake-sdk');


//***************************************** Template stuff
var consolidate = require('consolidate'),
  handlebars = consolidate.handlebars,
  templates = {},
  templateFiles = fs.readdirSync('./templates'),
  templateCount = templateFiles.length;
while (templateCount--) { //Read template contents into hash
  templates[templateFiles[templateCount].replace('\.html', '')] = fs.readFileSync('./templates/' + templateFiles[templateCount], 'utf8');
}

function renderTemplate (res, name) {
  handlebars.render(templates[name], {}, function(error, body) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', body.length);
    res.end(body);
  });
}


//************************************* Middleware
app.use(express.cookieParser());
app.use(express.cookieParser({secret: conf.get('sessionSecret')}));

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(quake.middleware.decision);



//************************************  Auth
function serialize (profile, done) {
  console.log(profile);
  quake.user.findOrCreate(profile, function(user) {
    done(null, user);
  });
}

function deserialize (obj, done) {
  console.log('deserialize', obj, done);
  quake.user.findByID(obj._id, function(apiUser) {
    done(null, apiUser);
  });
}
app.use(quiverAuth(serialize, deserialize));

app.get('/', function(req, res, next) {
  if (!req.session.passport.user) {
    res.setHeader('x-quiver-authenticated', false);
    renderTemplate(res, 'login');
  } else {
    res.setHeader('x-quiver-authenticated', true);
    next();
  }
});


//*********************************** Start server with Quake Auth
app.use(express.static(__dirname + '/dist')); //Needs to go last so that middleware can work on all requests


app.listen(conf.get('port'));
quake.auth.getToken(function(token) {
  console.log('Starting Quiver on port ' + conf.get('port'));
});

module.exports = app;