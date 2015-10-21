var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views');


var tempData = [
  { src : 'http://img01.deviantart.net/4c27/i/2013/143/e/1/dj_catbug_by_eilemont-d66c3gk.png', id : 1 },
  { src : 'http://i.imgur.com/s85Xa.png', id : 2 },
  { src : 'http://shirtoid.com/wp-content/uploads/2012/09/dead-link.jpg', id : 3 },
  { src : 'http://shirtoid.com/wp-content/uploads/2015/06/i-know-html-how-to-meet-ladies.jpg', id : 4 }
];

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/gallery', function (req, res) {
  res.render('index');
});

app.get('/gallery/new', function(req, res) {
  res.render('gallery_new');
});

app.get('/gallery/:id', function (req, res) {
  res.render('gallery_id');
});

app.post('/gallery', function (req, res) {
  res.send('POST NEW FIELDS TO GALLERY');
});

app.get('/gallery/:id/edit', function(req, res) {
  res.render('gallery_edit');
});

app.put('/gallery/:id', function (req, res) {
  res.send('SUBMIT GALLERY PAGE CHANGES');
});

app.delete('/gallery/:id', function (req, res) {
  res.send('DELETE GALLERY PAGE');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('_Architekt listening at http://%s:%s', host, port);
});

