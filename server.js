//REQUIRED STUFF
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local');
var db = require('./models');
var Post = db.post;
var methodOverride = require('method-override');
//var User = db.user;
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', './views');
app.use(session(
    {
      secret : 'poundbutt for the win',
      resave : false,
      saveUninitialized : true
    }
));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {

    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});
passport.deserializeUser(function(obj, done) {
  done(null, JSON.parse(obj));
});
passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username : username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message : 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message : 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));


app.post('/login',
    passport.authenticate('local', { successRedirect : '/gallery',
      failureRedirect : '/login',
      failureFlash : true })
);

app.get('/login', function(req,res) {
  res.render('login', { user : req.user, messages : req.flash('error') });
});

app.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/');
});



app.get('/', function (req, res) {
  Post.findAll().
    then(function(posts) {
      res.render('index', {
        tempData: posts
      });
    });
});

app.get('/gallery', function (req, res) {
  Post.findAll().then(
    function(posts) {
      res.render('index', {
        tempData: posts
      });
    });
});

app.get('/gallery/new', ensureAuthenticated, function(req, res) {
  res.render('gallery_new');
});

app.get('/gallery/:id', function (req, res) {
  Post.find({where : {'id': req.params.id}}).then(
    function(postById){
      res.render('gallery_id', {author : postById.author, descrip : postById.descrip, src : postById.src});
    }
  );
});

app.post('/gallery/new', function (req, res) {
  Post.create({ author : req.body.author, src: req.body.src, descrip: req.body.descrip })
      .then(function (post) {
        res.redirect('/gallery/'+post.id);
      });
});

app.get('/gallery/:id/edit', ensureAuthenticated, function(req, res) {
  Post.find({where : {'id': req.params.id}}).then(
    function(postById){
      res.render('gallery_edit', {author : postById.author, descrip : postById.descrip, src : postById.src});
    }
  );
});

//app.put('/gallery/:id', function (req, res) {
//  Post
//    .update({
//      id: req.params.id,
//      updatedAt: now(),
//      author : req.body.author,
//      src: req.body.src,
//      descrip: req.body.descrip
//  }, {where : {'id': req.params.id}});
//});

app.delete('/gallery/:id', ensureAuthenticated, function (req, res) {
  res.send('DELETE GALLERY PAGE');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();

  console.log('_Architekt listening at http://%s:%s', host, port);
});

var User = {
  findOne : function (opts, cb) {
    var user = {
      id : 1,
      username : opts.username,
      password : 'poundbutt',
      validPassword : function (password) {
        return (password === 'poundbutt');
      }
    };
    cb( null, user );
  }
};