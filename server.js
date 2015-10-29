//REQUIRED STUFF
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var Post = db.post;
//var User = db.user;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));



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

app.get('/gallery/new', function(req, res) {
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

app.get('/gallery/:id/edit', function(req, res) {
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

app.delete('/gallery/:id', function (req, res) {
  res.send('DELETE GALLERY PAGE');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  db.sequelize.sync();

  console.log('_Architekt listening at http://%s:%s', host, port);
});

