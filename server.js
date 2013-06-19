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
  quakeRoot = 'https://' + conf.get('quake_host') + ':' + conf.get('quake_port'),
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
  store: new RedisStore({client: redis})
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
  console.log('findig by id');
  quake.user.findByID(obj.id, function(err, user) {
    done(null, user);
  });
}

app.use(quiverAuth(serialize, deserialize)); // Only auth for index calls... it's not worth it for anything else

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
  var user = req.session.passport.user,
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

app.use(function (req, res) { // Catch all non-matched routes and return index.html
  if (conf.get('env') === 'development') {
    fs.readFile('./app/index.html', {encoding: 'utf8'}, function (err, data) {
      res.send(data);
    });
    console.log(indexDist);
  } else {
    res.send(indexDist);
  }

});

app.listen(conf.get('quiver_port')); // I'd start listening after successful auth... but you can't auth without listening first. Oh well.

quake.auth.getToken('quiver', null, null, function(token) {
  console.log('Starting Quiver on port ' + conf.get('quiver_port'));
});

module.exports = app;