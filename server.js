var express = require('express'),
  app = express(),
  conf = require('./convict.conf.js'),
  RedisStore = require('connect-redis')(express),
  redis = require('redis').createClient(),
  colors = require('colors'),
  fs = require('fs')
  quiverAuth = require('quiver-auth'),
  quake = require('quake-sdk'),
  _ = require('underscore'),
  quakeRoot = conf.get('quake_external'),
  indexDist = fs.readFileSync('./dist/index.html', 'utf8');

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
app.use(express.session({
  secret: conf.get('sessionSecret'),
  store: new RedisStore({client: redis}),
  cookie: {secure: false, maxAge: 14 * 24 * 60 *60}
}));

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

app.use(quake.middleware.decision);



//************************************  Auth
function serialize (profile, done) {
  quake.user.findOrCreate(profile, function(err, user) {
    done(null, user);
  });
}

function deserialize (obj, done) {
  quake.user.findByID(obj.id, function(err, user) {
    console.log('finding user', user.emails[0].value);
    done(null, user);
  });
}

// Auth only the calls that need it. Looking up users all of the time can get expensive, especially for favicons.
app.get('/', quiverAuth(serialize, deserialize));
app.all('/user', quiverAuth(serialize, deserialize));
app.get('/logout', quiverAuth(serialize, deserialize));


app.get('/', function(req, res, next) {
  var user = req.session.passport.user;
  if (!user) {
    return renderTemplate(res, 'login');
  }
  next();
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/user', function (req, res) {
  var user = req.user,
    quakeToken = req.session.passport.token,
    done = function (user, resultToken) {
      res.setHeader('Content-Type', 'text/json');
      res.setHeader('x-quake-token', resultToken);
      res.send(JSON.stringify({user: _.omit(user, ['clientID', 'clientSecret', 'values', '_json', '_raw']), quakeRoot: quakeRoot}));
    };
  if (!user) {
    return renderTemplate(res, 'login');
  } else if (quakeToken) {
    done(user, quakeToken);
  } else {
    quake.auth.getToken(user.id, user.clientID, user.clientSecret, function (token) {
      req.session.passport.token = token;
      done(user, token);
    });
  }
});




//*********************************** Start server with Quake Auth
if (conf.get('env') === 'development') { //Needs to go last so that middleware can work on all requests
  app.use(express.static(__dirname + '/app'));
} else {
  app.use(express.static(__dirname + '/dist'));
}

app.use(quiverAuth(serialize, deserialize)); // Auth every call that makes it this far
app.use(function (req, res) { // Catch all non-matched routes and return index.html
  if (!req.session.passport.user) {
    res.redirect('/');
  }
  if (conf.get('env') === 'development') {
    fs.readFile('./app/index.html', {encoding: 'utf8'}, function (err, data) {
      res.send(data);
    });
  } else {
    res.send(indexDist);
  }

});

app.listen(conf.get('quiver_port')); // I'd start listening after successful auth... but you can't auth without listening first. Oh well.

quake.auth.getToken('quiver', null, null, function(token) {
  console.log('Starting Quiver on port ' + conf.get('quiver_port'));
});

module.exports = app;